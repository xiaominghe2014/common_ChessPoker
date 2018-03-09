/**
 * Author: Ximena
 * Contact: xiaominghe2014@gmail.com
 * Date: 2018/3/8
 */

"use strict";

/**
 * utils
 * 工具函数
 */
const getLogInfo = ()=>{
    let path = require('path');
    let stackList = (new Error()).stack.split('\n').slice(3)
    let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
    let s = stackList[0]
    let sp = stackReg.exec(s) || stackReg2.exec(s)
    let data = {};
    if (sp && sp.length === 5) {
        data.method = sp[1];
        data.path = sp[2];
        data.line = sp[3];
        data.pos = sp[4];
        data.file = path.basename(data.path);
    }
    return data
}

const log_test = function(){
    let info = getLogInfo();
    let method = info.method;
    console.log(method + "======>",arguments,"<======");
}


//=========================================
//==================A-000==================
//=========================================
/**
 * 描述获取数组内连续元素之和的最大值
 * 算法:以连续元素个数为基数,遍历至 0
 * @param arr
 * @param max
 * @param count
 * @return {Integer}
 */

const getMaxContinuousSum = (arr,max,count=arr.length)=>{
    let total = (eArr)=> eArr.reduce((x,y)=>x+y)
    max = max || total(arr)
    if(count){
        for(let i = 0 ; i < arr.length-count+1 ; i++){
            let tmp = total(arr.slice(i,i+count))
            max = tmp>max?tmp:max
        }
        return getMaxContinuousSum(arr,max,count - 1)
    }
    return max
}

const test_getMaxContinuousSum = ()=>{
    let args_arr = [
        [1,-2,3,-1,4],
        [-8,-2,3,-1,4],
        [-10,-2,-3,-1,-4],
        [1,2],
        [966,-2,3,-1,4,136,-10]
    ]

    let result = []

    for(let arr of args_arr){
        result.push(getMaxContinuousSum(arr))
    }
    log_test('args_arr',args_arr,'result',result)
}




//=========================================
//===================test==================
//=========================================

const test = ()=>{
    test_getMaxContinuousSum()
}

test()