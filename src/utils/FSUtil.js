/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: markdown-clear
 * @FileName: FSUtil
 * @Dependence: --
 * @Description: --
 * @CreatedBy: liao.zhang
 * @CreateDate: 2017/7/30 16:17
 * @LastModifiedBy: liao.zhang
 * @LastModifiedDate: 2017/7/30 16:17
 *
 * --------------------------------------------------------------------------- *
 */

import sysFs from 'fs'
import sysPath from 'path'

const FsUtil = {
    getPathList: (basePath = './', fileExt = '',ignore = [], recursive = true) => {
        const pathList = [];
        let extList = [],ignoreList = [];
        if(fileExt){
            if(typeof fileExt === 'string'){
                extList.push(fileExt)
            }else if(Array.isArray(fileExt)){
                extList = fileExt.map((item) => {
                    return item.toLowerCase();
                });
            }else{
                //noop
            }
        }

        if(ignore){
            if(typeof ignore === 'string'){
                ignoreList.push(ignore)
            }else if(Array.isArray(ignore)){
                ignoreList = ignore;
            }
        }

        FsUtil._fillPathList(pathList,basePath, extList, ignoreList, recursive);

        return pathList;
    },
    _getPathStat: (path) => {
        let pathStat;
        try {
            pathStat = sysFs.statSync(path);
        } catch (e) {
            pathStat = null;
            console.log('获取路径状态失败:', path, '\n', e)
        }
        return pathStat;
    },
    _fillPathList: (fileList,basePath,extList,ignoreList, recursive) => {
        const self = FsUtil;
        if(!ignoreList.includes(sysPath.basename(basePath))){
            let pathStat = self._getPathStat(basePath);
            if (pathStat) {
                if (pathStat.isFile()) {
                    if (extList.includes(sysPath.extname(basePath).toLowerCase())) {
                        fileList.push(basePath);
                    }
                } else if (pathStat.isDirectory()) {
                    const files = sysFs.readdirSync(basePath);
                    files.forEach(function (name) {
                        const nextPath = sysPath.resolve(basePath, name);
                        pathStat = self._getPathStat(nextPath);
                        if (pathStat) {
                            if (pathStat.isFile()) {
                                if (extList.includes(sysPath.extname(nextPath).toLowerCase())) {
                                    fileList.push(nextPath);
                                }
                            } else if (pathStat.isDirectory()) {
                                recursive && self._fillPathList(fileList,nextPath,extList,ignoreList, recursive);
                            } else {
                                //noop
                            }
                        }
                    })
                } else {
                    //noop
                }
            }
        }
    }
}


export default FsUtil
export {
    FsUtil
}