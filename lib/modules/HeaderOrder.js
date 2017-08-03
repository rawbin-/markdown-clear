'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderOrder = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
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

var _require = require('../utils/FSUtil'),
    FsUtil = _require.FsUtil;

var LINE_SEP = '\n';
var HEADER_LEN = 6;

var HeaderOrder = {
    processDir: function processDir(srcPath, dstPath, recursive) {
        var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'utf-8';

        var fileList = FsUtil.getPathList(srcPath, ['.md', '.markdown'], ['.git', 'node_modules'], recursive);
        var baseSrcPath = _path2.default.resolve(srcPath);
        var baseDstPath = _path2.default.resolve(dstPath);
        fileList.forEach(function (path) {
            HeaderOrder.processFile(path, path.replace(baseSrcPath, baseDstPath));
        });
    },
    processFile: function processFile(srcPath, dstPath) {
        var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf-8';

        _fs2.default.stat(srcPath, function (err, stats) {
            if (err) {
                throw err;
            }

            var self = HeaderOrder;
            _fs2.default.readFile(srcPath, encoding, function (err, data) {
                var newContent = self.processContent(data);
                var dstDir = _path2.default.dirname(dstPath);
                if (!_fs2.default.existsSync(dstDir)) {
                    FsUtil.mkdirp(dstDir);
                }
                _fs2.default.writeFile(dstPath, newContent, 'utf-8', function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
    },
    processContent: function processContent(content) {
        var fileLines = content.split(LINE_SEP);
        var headerRegex = /^(#+)\s*(.*)\s*(#?)/;
        var orderedHeaderRegex = /^(#+)\s*(\d+([\.\d+]+)?\.?)\s*(#+)?/;

        var firstHeader = HeaderOrder.findFirstHeader(fileLines);
        var headerList = [0, 0, 0, 0, 0, 0]; // h1,h2...h6
        if (firstHeader) {
            headerList.splice(0, firstHeader.length - 1);
        }

        var tmpItem = void 0,
            tmpHeader = void 0,
            tmpHeaderOrder = void 0;
        var resultLines = fileLines.map(function (item) {
            //如果已经有Header 序号就清空
            tmpItem = item.replace(orderedHeaderRegex, '$1 ');
            tmpItem = tmpItem.replace(headerRegex, function (match, $1, $2) {
                tmpHeader = $1;
                //排除 第一个标题不是最大的标题 和 最小标题不是h6的情况
                if (tmpHeader.length < firstHeader.length || tmpHeader.length > HEADER_LEN) {
                    return tmpItem;
                } else {
                    //当前header对应的位置
                    var targetIndex = tmpHeader.length - firstHeader.length;
                    headerList[targetIndex]++;
                    //重置所有子集的序号
                    var subSetLen = HEADER_LEN - tmpHeader.length + 1;
                    headerList.splice.apply(headerList, [targetIndex + 1, subSetLen].concat(_toConsumableArray(new Array(subSetLen).fill(0))));

                    var targetHeader = headerList.slice(0, targetIndex + 1);

                    return $1 + ' ' + targetHeader.join('.') + ' ' + $2;
                }
            });

            return tmpItem;
        });

        return resultLines.join(LINE_SEP);
    },
    findFirstHeader: function findFirstHeader() {
        var fileLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var firstHeader = '';
        var tmpResult = void 0;
        fileLines.some(function (item) {
            tmpResult = item.match(/^(#+)\s*/);
            if (tmpResult) {
                firstHeader = tmpResult[1];
            }
            return tmpResult;
        });
        return firstHeader;
    }
};

exports.default = HeaderOrder;
exports.HeaderOrder = HeaderOrder;