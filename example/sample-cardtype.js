const creditcard = require('../index')
const number = '4111111111111111'

const type = creditcard.cardtype(number)
console.log(type)
