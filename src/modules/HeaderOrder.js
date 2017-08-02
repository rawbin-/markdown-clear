/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: markdown-clear
 * @FileName: HeaderOrder
 * @Dependence: --
 * @Description: --
 * @CreatedBy: liao.zhang
 * @CreateDate: 2017/7/30 16:22
 * @LastModifiedBy: liao.zhang
 * @LastModifiedDate: 2017/7/30 16:22
 *
 * --------------------------------------------------------------------------- *
 */

import sysFs from 'fs'
import fsUtil from '../utils/FSUtil'

const lineSeperator = '\n';
const HeaderOrder = {
    processFile:(filePath,encoding='utf-8') => {
        sysFs.stat(filePath,(err,stats) => {
            if(err){
                throw err;
            }

            const self = HeaderOrder;
            sysFs.readFile(filePath,encoding,(err,data) => {
               self.processContent(data);
            });
        })
    },
    processContent:(content) => {
        const fileLines = content.split(lineSeperator);
        const headerRegex = /^(#+)\s*/;
        const orderedHeaderRegex = /^(#+)\s*(\d+[\.\d+]+\.?)\s*/;

        const firstHeader = HeaderOrder.findFirstHeader(fileLines);
        const headerList = [0,0,0,0,0,0];// h1,h2...h6
        if(firstHeader){
            headerList.splice(0, 6 + 1 - firstHeader.length);
        }



    },
    findFirstHeader:(fileLines = []) => {
        let firstHeader = '';
        let tmpResult;
        fileLines.some((item) => {
            tmpResult = item.match(/^(#+)\s*/);
            if(tmpResult){
                firstHeader = tmpResult[1]
            }
            return tmpResult;
        });
        return firstHeader;
    }
};


export default HeaderOrder
export {
    HeaderOrder
}