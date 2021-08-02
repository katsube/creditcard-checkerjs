/**
 * CreditCard-Checker.js
 *    Card specs
 *
 * @version 1.0.0
 * @author M.Katsube <katsubemakito@gmail.com>
 * @license MIT (see LICENSE)
 */
'use strict';

//---------------------------------------------
// define
//---------------------------------------------
const SPECS = {
  VISA:{
    length: [13, 16],
    security: {
      name: 'CVV',
      length: 3
    }
  },
  MASTER:{
    length: [16],
    security: {
      name: 'CVC',
      length: 3
    }
  },
  JCB:{
    length: [16],
    security: {
      name: 'CVV',
      length: 3
    }
  },
  AMEX:{
    length: [15],
    security: {
      name: 'CID',
      length: 4
    }
  },
  DINERS:{
    length: [14],
    security: {
      name: 'CVV',
      length: 3
    }
  }
}

//---------------------------------------------
// functions
//---------------------------------------------
function getLength(brand){
  if( brand in SPECS ){
    return SPECS[brand].length
  }
  return null
}


//---------------------------------------------
// exports
//---------------------------------------------
module.exports = {
  SPECS,
  getLength
}