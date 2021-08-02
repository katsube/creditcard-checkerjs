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