/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: markdown-clear
 * @FileName: FSUtil
 * @Dependence: --
 * @Description: --
 * @CreatedBy: liao.zhang
 * @CreateDate: 2017/7/30 16:25
 * @LastModifiedBy: liao.zhang
 * @LastModifiedDate: 2017/7/30 16:25
 *
 * --------------------------------------------------------------------------- *
 */

const {FsUtil} = require('../../lib/utils/FSUtil');

console.log('1111:',FsUtil.getPathList('../../',['.md','.markdown']));

console.log('2222:',FsUtil.getPathList('../../',['.md','.markdown'],['.git','node_modules']));

console.log('3333:',FsUtil.getPathList('../../src',['.js'],['.js']));

