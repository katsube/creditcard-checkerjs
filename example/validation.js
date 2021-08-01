const creditcard = require('../index')
const number = '4111111111111111'

if( creditcard.validate(number) ){
  console.log('correct!')
}
else{
  console.log(`incorrect! ${creditcard.getErrorMessage()}`)
}
