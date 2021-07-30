/**
 * CreditCard-Checker.js
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

const checkdigit = require('./src/checkdigit')
const cardType = require('./src/cardtype')

module.exports = {
  validate: number => checkdigit.validate(number),
  cardtype: number => cardType.checkPrefix(number),
  type: cardType.list
}