# CreditCard-Checker.js

## Example
```javascript
const creditcard = require('creditcard-checkerjs')
const number = '4111111111111111'

// CheckDigit
if( creditcard.verify(number) ){
  console.log('valid')
}
else{
  console.log('invalid')
}

// Get Card Type
const type = creditcard.cardtype(number)
switch( type ){
  case creditcard.type.VISA:   console.log('Visa'); break;
  case creditcard.type.MASTER: console.log('Mastercard'); break;
  case creditcard.type.JCB:    console.log('JCB'); break;
  case creditcard.type.AMEX:   console.log('American Express'); break;
  case creditcard.type.DINERS: console.log('Diners'); break;
  default: console.log('Unknown'); break;
}
```

