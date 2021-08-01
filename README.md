# CreditCard-Checker.js

This is a simple module that verifies the checksum of credit card numbers and detects international brands from credit card numbers.

Currently, the following international brands are supported.

* VISA
* Master Card
* JCB
* American Express (AMEX)
* Diners Club
## Install
```shellsession
$ npm install creditcard-checkerjs
```
## Example
```javascript
const creditcard = require('creditcard-checkerjs')
const number = '4111111111111111'

// Checksum
if( creditcard.verify(number) ){
  console.log('valid')
}
else{
  console.log('invalid')
}

// Get CardBrand
const type = creditcard.cardtype(number)
switch( type ){
  case creditcard.type.VISA:   console.log('Visa'); break;
  case creditcard.type.MASTER: console.log('Mastercard'); break;
  case creditcard.type.JCB:    console.log('JCB'); break;
  case creditcard.type.AMEX:   console.log('American Express'); break;
  case creditcard.type.DINERS: console.log('Diners'); break;

  case creditcard.type.UNKNOWN:
  default:
      console.log('Unknown'); break;
}
```

## Licence
MIT License