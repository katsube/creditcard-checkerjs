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