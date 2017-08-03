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
import sysPath from 'path'
const {FsUtil} = require('../utils/FSUtil');

const LINE_SEP = '\n';
const HEADER_LEN = 6;

const HeaderOrder = {
    processDir:(srcPath,dstPath,recursive,encoding='utf-8') => {
        const fileList = FsUtil.getPathList(srcPath,['.md','.markdown'],['.git','node_modules'],recursive);
        const baseSrcPath = sysPath.resolve(srcPath);
        const baseDstPath = sysPath.resolve(dstPath);
        fileList.forEach((path) => {
            HeaderOrder.processFile(path,path.replace(baseSrcPath,baseDstPath));
        });
    },
    processFile:(srcPath,dstPath,encoding='utf-8') => {
        sysFs.stat(srcPath,(err,stats) => {
            if(err){
                throw err;
            }

            const self = HeaderOrder;
            sysFs.readFile(srcPath,encoding,(err,data) => {
                const newContent = self.processContent(data);
                const dstDir = sysPath.dirname(dstPath);
                if(!sysFs.existsSync(dstDir)){
                    FsUtil.mkdirp(dstDir);
                }
                sysFs.writeFile(dstPath,newContent,'utf-8',(err) => {
                    if(err){
                        throw err
                    }
                })
            });
        })
    },
    processContent:(content) => {
        const fileLines = content.split(LINE_SEP);
        const headerRegex = /^(#+)\s*(.*)\s*(#?)/;
        const orderedHeaderRegex = /^(#+)\s*(\d+([\.\d+]+)?\.?)\s*(#+)?/;

        const firstHeader = HeaderOrder.findFirstHeader(fileLines);
        const headerList = [0,0,0,0,0,0];// h1,h2...h6
        if(firstHeader){
            headerList.splice(0, firstHeader.length - 1);
        }

        let tmpItem,tmpHeader,tmpHeaderOrder;
        const resultLines = fileLines.map((item) => {
            //如果已经有Header 序号就清空
            tmpItem = item.replace(orderedHeaderRegex,'$1 ');
            tmpItem = tmpItem.replace(headerRegex,(match,$1,$2) => {
                tmpHeader = $1;
                //排除 第一个标题不是最大的标题 和 最小标题不是h6的情况
                if(tmpHeader.length < firstHeader.length || tmpHeader.length > HEADER_LEN){
                    return tmpItem;
                }else{
                    //当前header对应的位置
                    let targetIndex = tmpHeader.length - firstHeader.length;
                    headerList[targetIndex]++;
                    //重置所有子集的序号
                    let subSetLen = HEADER_LEN - tmpHeader.length + 1;
                    headerList.splice(targetIndex + 1,subSetLen,...(new Array(subSetLen)).fill(0));

                    let targetHeader = headerList.slice(0, targetIndex + 1);

                    return `${$1} ${targetHeader.join('.')} ${$2}`;
                }

            });

            return tmpItem;
        });

        return resultLines.join(LINE_SEP);
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