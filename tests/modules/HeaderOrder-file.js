/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: markdown-clear
 * @FileName: HeaderOrder.js
 * @Dependence: --
 * @Description: --
 * @CreatedBy: liao.zhang
 * @CreateDate: 2017/8/2 22:48
 * @LastModifiedBy: liao.zhang
 * @LastModifiedDate: 2017/8/2 22:48
 *
 * --------------------------------------------------------------------------- *
 */

const {HeaderOrder}  = require('../../lib/modules/HeaderOrder');

let result = HeaderOrder.processContent(`
## a
## aa
## bb
### aaa
### bbb
# b
## bb
### bbb
### bbb
## bb
`);

console.log(result)

result = HeaderOrder.processContent(`
## a
### aa
### bb
#### aaa
#### bbb
## b
### bb
#### bbb
#### bbb
### bb
`);

console.log(result)

result = HeaderOrder.processContent(`
### a
#### aa
#### bb
##### aaa
##### bbb
### b
#### bb
##### bbb
##### bbb
#### bb
`);

console.log(result)


result = HeaderOrder.processContent(`
#### a
##### aa
##### bb
###### aaa
###### bbb
#### b
##### bb
###### bbb
###### bbb
##### bb
`);

console.log(result)

result = HeaderOrder.processContent(`
##### a
###### aa
###### bb
####### aaa
####### bbb
##### b
###### bb
####### bbb
####### bbb
###### bb
`);

console.log(result)

result = HeaderOrder.processContent(`
###### a
####### aa
####### bb
######## aaa
######## bbb
###### b
####### bb
######## bbb
######## bbb
####### bb
`);

console.log(result)