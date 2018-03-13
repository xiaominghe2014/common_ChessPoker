import path =  require('path');

interface LogInfo{
    method:string;
    path:string;
    line:string;
    pos:string;
    file:string;
}
/**
 * 日志函数
 */
export function getLogInfo():LogInfo{
    let stackList = (new Error()).stack.split('\n').slice(3)
    let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
    let s = stackList[0]
    let sp = stackReg.exec(s) || stackReg2.exec(s)
    let data:LogInfo = {method:'',path:'',line:'',pos:'',file:''}
    if (sp && sp.length === 5) {
        data.method = sp[1];
        data.path = sp[2];
        data.line = sp[3];
        data.pos = sp[4];
        data.file = path.basename(data.path);
    }
    return data
}

export function qp_log (...args):void {
    let info:LogInfo = getLogInfo();
    console.log("==================================");
    console.log(info);
    args.forEach((arg)=>console.log(arg));
    console.log("==================================");
}