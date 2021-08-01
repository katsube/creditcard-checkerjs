/**
 * CreditCard-Checker.js
 *    Checksum for credit card numbers
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

function validate(number){
  const temp = (typeof number === 'string')? number:String(number)
  const n = temp
              .split('')              // 1文字ずつ分割し配列に
              .map( a => Number(a) )  // 配列の各要素を文字列型→数値型に変換
              .reverse()              // 配列を逆順にする
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
  validate
}