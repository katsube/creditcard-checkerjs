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
function validate(number) {
  const brand = cardType.brand(number)
  if( brand === cardType.TYPE.UNKNOWN ){
    ERROR.message = 'Unknown card type'
    return(false)
  }
  if( ! checksum.verify(number) ){
    ERROR.message = 'Invalid checksum'
    return(false)
  }

  const checklen = cardSpec.getLength(brand)
                            .some(len => len === number.length)
  if( ! checklen ){
    ERROR.message = `Invalid length`
    return(false)
  }

  return(true)
}

/**
 * return last errr message
 *
 * @return {string}
 */
function getErrorMessage(){
  return(ERROR.message)
}

//---------------------------------------------
// exports
//---------------------------------------------
module.exports = {
  validate,
  verify: number => checksum.verify(number),
  cardtype: number => cardType.brand(number),
  getErrorMessage,
  type: cardType.TYPE
}