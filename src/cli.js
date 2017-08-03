#!/usr/bin/env node

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

const fs = require('fs');
const {FsUtil} = require('./utils/FSUtil');
const {HeaderOrder}  = require('./modules/HeaderOrder');

const yargs = require('yargs');
const argsObj = yargs
    .usage('Usage: $0 input [output] [-r]')
    .help('h')
    .option('r',{
        alias:'recursive',
        boolean:true,
        describe:'recursive process markdown files in directory'
    })
    .option('force',{
        boolean:true,
        describe:'force to update on the origin file'
    })
    .argv;
const argsList = argsObj._;

if(argsList.length === 0){
    yargs.showHelp();
}else{
    let input = argsList[0],output = argsList[1];
    if(!output && !argsObj.force){
        yargs.showHelp();
    }else{
        if(argsObj.force){
            output = input;
        }

        fs.stat(input,(err,stats) => {
            if(err){
                throw err;
            }else{
                if(stats.isFile()){
                    HeaderOrder.processFile(input,output);
                }else if(stats.isDirectory()){
                    HeaderOrder.processDir(input,output,argsObj.recursive);
                }else{
                    //noop
                }
            }
        })
    }

}