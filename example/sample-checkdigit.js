const creditcard = require('../index')
const number = '4111111111111111'

// CheckDigit
if( creditcard.validate(number) ){
  console.log('valid')
}
else{
  console.log('invalid')
}