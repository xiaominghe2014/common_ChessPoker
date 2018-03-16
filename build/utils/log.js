"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var LogInfo = /** @class */ (function () {
    function LogInfo() {
    }
    return LogInfo;
}());
exports.LogInfo = LogInfo;
/**
 * 日志函数
 */
function getLogInfo() {
    var stackList = ((new Error()).stack || "").split('\n').slice(3);
    var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
    var s = stackList[0];
    var sp = stackReg.exec(s) || stackReg2.exec(s);
    var data = new LogInfo();
    if (sp && sp.length === 5) {
        data.method = sp[1];
        data.path = sp[2];
        data.line = sp[3];
        data.pos = sp[4];
        data.file = path.basename(data.path);
    }
    return data;
}
exports.getLogInfo = getLogInfo;
function qp_log(message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var info = getLogInfo();
    args.unshift(message);
    console.log("==================================");
    console.log(info.path, info.method, info.line);
    args.forEach(function (arg) { return console.log(arg); });
    console.log("==================================");
}
exports.qp_log = qp_log;
//# sourceMappingURL=log.js.map