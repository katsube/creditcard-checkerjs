/**
 * CreditCard-Checker.js
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

const checksum = require('./src/checksum')
const cardType = require('./src/cardtype')

module.exports = {
  verify: number => checksum.verify(number),
  cardtype: number => cardType.checkPrefix(number),
  type: cardType.list
}