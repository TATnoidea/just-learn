/**
 * 特殊类型
 * 
 * @flow
 */

 const a: 'foo'= 'foo';

 const type: 'success' | 'warning' | 'danger' = 'success';

 type StringOrNumber = string | number;

 const b: string | number = 100;

 // ------------------------------------------

 // Maybe类型
 const gender: ?number = null;