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
  DINERS: 5
}

function checkPrefix(n){
  return(list.VISA)
}

module.exports = {
  list,
  checkPrefix
}