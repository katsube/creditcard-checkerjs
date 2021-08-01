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

module.exports = {
  verify
}