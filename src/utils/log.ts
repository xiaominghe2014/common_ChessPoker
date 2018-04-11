import path = require('path');
export class LogInfo {
    method: string;
    path: string;
    line: string;
    pos: string;
    file: string;
}
/**
 * 日志函数
 */
export function getLogInfo(): LogInfo {
    let stackList = ((new Error()).stack || "").split('\n').slice(3)
    let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
    let s = stackList[0]
    let sp = stackReg.exec(s) || stackReg2.exec(s)
    let data: LogInfo = new LogInfo()
    if (sp && sp.length === 5) {
        data.method = sp[1];
        data.path = sp[2];
        data.line = sp[3];
        data.pos = sp[4];
        data.file = path.basename(data.path);
    }
    return data
}

export function qp_log(message: string, ...args: any[]): void {
    let info: LogInfo = getLogInfo();
    //args.unshift(message);
    console.log("==================================");
    console.log(info.path, info.method, info.line)
    while (args.length) {
        let value = args.shift()
        if (value instanceof Object) {
            try {
                value = JSON.stringify(value);
            } catch (error) {
                console.error(error)
            }
        }
        message = message.replace('{}', value)
    }
    console.log(message)
    //args.forEach((arg) => console.log(arg));
    console.log("==================================");
}