#!/usr/bin/env node
'use strict';

/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: markdown-clear
 * @FileName: cli.js
 * @Dependence: --
 * @Description: --
 * @CreatedBy: liao.zhang
 * @CreateDate: 2017/8/3 19:48
 * @LastModifiedBy: liao.zhang
 * @LastModifiedDate: 2017/8/3 19:48
 *
 * --------------------------------------------------------------------------- *
 */

var fs = require('fs');

var _require = require('./utils/FSUtil'),
    FsUtil = _require.FsUtil;

var _require2 = require('./modules/HeaderOrder'),
    HeaderOrder = _require2.HeaderOrder;

var yargs = require('yargs');
var argsObj = yargs.usage('Usage: $0 input [output] [-r]').help('h').option('r', {
    alias: 'recursive',
    boolean: true,
    describe: 'recursive process markdown files in directory'
}).option('force', {
    boolean: true,
    describe: 'force to update on the origin file'
}).argv;
var argsList = argsObj._;

if (argsList.length === 0) {
    yargs.showHelp();
} else {
    var input = argsList[0],
        output = argsList[1];
    if (!output && !argsObj.force) {
        yargs.showHelp();
    } else {
        if (argsObj.force) {
            output = input;
        }

        fs.stat(input, function (err, stats) {
            if (err) {
                throw err;
            } else {
                if (stats.isFile()) {
                    HeaderOrder.processFile(input, output);
                } else if (stats.isDirectory()) {
                    HeaderOrder.processDir(input, output, argsObj.recursive);
                } else {
                    //noop
                }
            }
        });
    }
}