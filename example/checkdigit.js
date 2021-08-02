const creditcard = require('../index')
const number = '4111111111111111'

if( creditcard.verify(number) ){
  console.log('valid')
}
else{
  console.log('invalid')
}