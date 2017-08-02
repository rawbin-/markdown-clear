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

HeaderOrder.processContent(`
### aaa
#### bb
`);