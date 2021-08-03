(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.creditcard = require('./index')

},{"./index":2}],2:[function(require,module,exports){
/**
 * CreditCard-Checker.js
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

//---------------------------------------------
// modules
//---------------------------------------------
const checksum = require('./src/checksum')
const cardType = require('./src/cardtype')
const cardSpec = require('./src/cardspec')

//---------------------------------------------
// Global variables
//---------------------------------------------
const ERROR = {
  code: null,
  message: ''
}

//---------------------------------------------
// functions
//---------------------------------------------
/**
 * Check that the format of the card number is correct.
 *
 * @param {string} number - Card number '4111111111111111'
 * @return {boolean}
 */
function check(number) {
  const brand = cardType.brand(number)
  if( brand === cardType.TYPE.UNKNOWN ){
    ERROR.code = 'ER110001'
    ERROR.message = 'Unknown card type'
    return(false)
  }
  if( ! checksum.verify(number) ){
    ERROR.code = 'ER110002'
    ERROR.message = 'Invalid checksum'
    return(false)
  }

  const checklen = cardSpec.getLength(brand)
                            .some(len => len === number.length)
  if( ! checklen ){
    ERROR.code = 'ER110003'
    ERROR.message = `Invalid length`
    return(false)
  }

  return(true)
}

/**
 * return last errr
 *
 * @returns {object}
 */
function getError(){
  return( ERROR )
}


//---------------------------------------------
// exports
//---------------------------------------------
module.exports = {
  check,
  verify: number => checksum.verify(number),
  cardtype: number => cardType.brand(number),
  getError,
  type: cardType.TYPE
}
},{"./src/cardspec":3,"./src/cardtype":4,"./src/checksum":5}],3:[function(require,module,exports){
/**
 * CreditCard-Checker.js
 *    Card specs
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

//---------------------------------------------
// define
//---------------------------------------------
const SPECS = {
  VISA:{
    length: [13, 16],
    security: {
      name: 'CVV',
      length: 3
    }
  },
  MASTER:{
    length: [16],
    security: {
      name: 'CVC',
      length: 3
    }
  },
  JCB:{
    length: [16],
    security: {
      name: 'CVV',
      length: 3
    }
  },
  AMEX:{
    length: [15],
    security: {
      name: 'CID',
      length: 4
    }
  },
  DINERS:{
    length: [14],
    security: {
      name: 'CVV',
      length: 3
    }
  }
}

//---------------------------------------------
// functions
//---------------------------------------------
function getLength(brand){
  if( brand in SPECS ){
    return SPECS[brand].length
  }
  return null
}


//---------------------------------------------
// exports
//---------------------------------------------
module.exports = {
  SPECS,
  getLength
}
},{}],4:[function(require,module,exports){
/**
 * CreditCard-Checker.js
 *    Detect the international brand of credit card number.
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

//---------------------------------------------
// define
//---------------------------------------------
const TYPE = {
  VISA:   'VISA',
  MASTER: 'MASTER',
  JCB:    'JCB',
  AMEX:   'AMEX',
  DINERS: 'DINERS',
  UNKNOWN: -1
}

//---------------------------------------------
// functions
//---------------------------------------------
// Utilities
const between = (value, min, max) => ((min <= Number(value)) && (Number(value) <= max))

// Card Brand check
const isVisa   = n => n.substr(0,1) === '4'
const isMaster = n => n.match(/^5[1-5]/) || between(n.substr(0,6), 222100, 272099)
const isJCB    = n => between(n.substr(0,4), 3528, 3589)
const isAmex   = n => n.match(/^3[47]/)
const isDiners = n => between(n.substr(0,6), 300000, 303574) || n.substr(0,4) === '3095' || n.match(/^3[689]/)

/**
 * Detect the card brand.
 *
 * @param {string} n - credit card number
 * @returns
 */
function brand(n){
  if( isVisa(n) ){
    return(TYPE.VISA)
  }
  else if( isMaster(n) ){
    return(TYPE.MASTER)
  }
  else if( isJCB(n) ){
    return(TYPE.JCB)
  }
  else if( isAmex(n) ){
    return(TYPE.AMEX)
  }
  else if( isDiners(n) ){
    return(TYPE.DINERS)
  }

  return(TYPE.UNKNOWN)
}


//---------------------------------------------
// exports
//---------------------------------------------
module.exports = {
  TYPE,
  brand,

  isVisa,
  isMaster,
  isJCB,
  isAmex,
  isDiners
}
},{}],5:[function(require,module,exports){
/**
 * CreditCard-Checker.js
 *    Checksum for credit card numbers
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

/**
 * Verify the checksum of a credit card number
 *
 * @param {string} number - credit card number '4111111111111111'
 * @returns {boolean}
 */
function verify(number){
  const temp = (typeof number === 'string')? number:String(number)
  const n = temp
              .split('')
              .map( a => Number(a) )
              .reverse()
  let total = 0;

  for(let i=0; i<n.length; i++){
    if( ((i + 1) % 2) === 0 ){
      const value = n[i] * 2
      total += (value > 9)? value - 9 : value
    }
    else{
      total += n[i]
    }
  }

  return( total % 10 === 0 )
}

//---------------------------------------------
// exports
//---------------------------------------------
module.exports = {
  verify
}
},{}]},{},[1]);
