/**
 * CreditCard-Checker.js
 *    Check Digit
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

function validate(n){
  const number = splitNumber(n).reverse()
  let total = 0;

  for(let i=0; i<number.length; i++){
    if( ((i + 1) % 2) === 0 ){
      const temp = number[i] * 2
      total += (temp > 9)? temp - 9 : temp
    }
    else{
      total += number[i]
    }
  }

  return( total % 10 === 0 )
}

function splitNumber(num){
  let number;
  if( typeof num === 'number' ){
    number = String(num)
  }
  else if( (typeof num === 'string') && (num.match(/^[0-9]{1,}$/)) ){
    number = num
  }
  else{
    return([-1])
  }

  return( number.split('').map( a => Number(a) ) )
}

module.exports = {
  validate
}