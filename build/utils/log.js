"use strict";
// import path =  require('path');
// export class LogInfo{
//     method:string;
//     path:string;
//     line:string;
//     pos:string;
//     file:string;
// }
/**
 * 日志函数
 */
// export function getLogInfo():LogInfo{
//     let stackList = (new Error()).stack.split('\n').slice(3)
//     let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
//     let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
//     let s = stackList[0]
//     let sp = stackReg.exec(s) || stackReg2.exec(s)
//     let data:LogInfo = new LogInfo()
//     if (sp && sp.length === 5) {
//         data.method = sp[1];
//         data.path = sp[2];
//         data.line = sp[3];
//         data.pos = sp[4];
//         data.file = path.basename(data.path);
//     }
//     return data
// }
Object.defineProperty(exports, "__esModule", { value: true });
function qp_log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    //let info:LogInfo = getLogInfo();
    console.log("==================================");
    args.forEach(function (arg) { return console.log(arg); });
    console.log("==================================");
}
exports.qp_log = qp_log;
//# sourceMappingURL=log.js.map