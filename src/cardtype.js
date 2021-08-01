/**
 * CreditCard-Checker.js
 *    Card Type
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

const list = {
  VISA:   1,
  MASTER: 2,
  JCB:    3,
  AMEX:   4,
  DINERS: 5,
  UNKNOWN: -1
}

function checkPrefix(n){
  if( isVisa(n) ){
    return(list.VISA)
  }
  else if( isMaster(n) ){
    return(list.MASTER)
  }
  else if( isJCB(n) ){
    return(list.JCB)
  }
  else if( isAmex(n) ){
    return(list.AMEX)
  }
  else if( isDiners(n) ){
    return(list.DINERS)
  }

  return(list.UNKNOWN)
}

function isVisa(n){
  return(n.substr(0,1) === '4')
}

function isMaster(n){
  if( n.match(/^5[1-5]/) ){
    return(true)
  }
  // since 2016
  if( n.length >= 6 && n.match(/^2[2-7]/) ){
    const prefix = n.substr(0,6)
    const number = Number(prefix)
    if( (222100 <= number) && (number <= 272099) ){
      return(true)
    }
  }
  return(false)
}

function isJCB(n){
  if( (n.length >= 4) && (n.match(/^35/)) ){
    const prefix = n.substr(0,4)
    const number = Number(prefix)
    if( (3528 <= number) && (number <= 3589) ){
      return(true)
    }
  }
  return(false)
}

function isAmex(n){
  return( n.match(/^3[47]/) )
}

function isDiners(n){
  if( n.substr(0,) ||   n.match(/^3[689]/) ){
  }
}


module.exports = {
  list,
  checkPrefix
}