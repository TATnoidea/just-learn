/**
 * Mixed Any
 * 
 * @flow
 */

 // string | number | boolean | ...
 function passMixed(value: mixed) {

  if (typeof value === 'string') {
    value.substr(1);
  }

  if (typeof value === 'number') {
    value * value;
  }
 }

 passMixed('string');

 passMixed(100)

 function passAny(value: any) {
  value.substr(1);
  value * value;
 }

 passAny('string');
 passAny(100);


 // 区别
 // mixed强类型，any 弱类型