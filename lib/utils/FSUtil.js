'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FsUtil = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp2 = require('mkdirp');

var _mkdirp3 = _interopRequireDefault(_mkdirp2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FsUtil = {
    getPathList: function getPathList() {
        var basePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';
        var fileExt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var ignore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var recursive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        var pathList = [];
        var extList = [],
            ignoreList = [];
        if (fileExt) {
            if (typeof fileExt === 'string') {
                extList.push(fileExt);
            } else if (Array.isArray(fileExt)) {
                extList = fileExt.map(function (item) {
                    return item.toLowerCase();
                });
            } else {
                //noop
            }
        }

        if (ignore) {
            if (typeof ignore === 'string') {
                ignoreList.push(ignore);
            } else if (Array.isArray(ignore)) {
                ignoreList = ignore;
            }
        }

        FsUtil._fillPathList(pathList, basePath, extList, ignoreList, recursive);

        return pathList;
    },
    _getPathStat: function _getPathStat(path) {
        var pathStat = void 0;
        try {
            pathStat = _fs2.default.statSync(path);
        } catch (e) {
            pathStat = null;
            console.log('获取路径状态失败:', path, '\n', e);
        }
        return pathStat;
    },
    _fillPathList: function _fillPathList(fileList, basePath, extList, ignoreList, recursive) {
        var self = FsUtil;
        if (!ignoreList.includes(_path2.default.basename(basePath))) {
            var pathStat = self._getPathStat(basePath);
            if (pathStat) {
                if (pathStat.isFile()) {
                    if (extList.includes(_path2.default.extname(basePath).toLowerCase())) {
                        fileList.push(basePath);
                    }
                } else if (pathStat.isDirectory()) {
                    var files = _fs2.default.readdirSync(basePath);
                    files.forEach(function (name) {
                        var nextPath = _path2.default.resolve(basePath, name);
                        pathStat = self._getPathStat(nextPath);
                        if (pathStat) {
                            if (pathStat.isFile()) {
                                if (extList.includes(_path2.default.extname(nextPath).toLowerCase())) {
                                    fileList.push(nextPath);
                                }
                            } else if (pathStat.isDirectory()) {
                                recursive && self._fillPathList(fileList, nextPath, extList, ignoreList, recursive);
                            } else {
                                //noop
                            }
                        }
                    });
                } else {
                    //noop
                }
            }
        }
    },
    mkdirp: function mkdirp(path) {
        _mkdirp3.default.sync(path);
    }
}; /**
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

exports.default = FsUtil;
exports.FsUtil = FsUtil;