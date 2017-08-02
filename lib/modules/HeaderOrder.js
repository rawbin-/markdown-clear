'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderOrder = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _FSUtil = require('../utils/FSUtil');

var _FSUtil2 = _interopRequireDefault(_FSUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var lineSeperator = '\n';
var HeaderOrder = {
    processFile: function processFile(filePath) {
        var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';

        _fs2.default.stat(filePath, function (err, stats) {
            if (err) {
                throw err;
            }

            var self = HeaderOrder;
            _fs2.default.readFile(filePath, encoding, function (err, data) {
                self.processContent(data);
            });
        });
    },
    processContent: function processContent(content) {
        var fileLines = content.split(lineSeperator);
        var headerRegex = /^#+\s*/;
        var orderedHeaderRegex = /^#+\s*\d+\.\d+\s*/;

        var firstHeader = HeaderOrder.findFirstHeader(fileLines);
        var headerList = [1,1,1,1,1,1]; // h1,h2...h6
        if (firstHeader) {
            headerList.splice(0, 6 + 1 - firstHeader.length);
        }
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