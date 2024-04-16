"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../src/utils/log");
var dlx_1 = require("../src/algorithm/x/dlx");
function transitionStr2Matrix(str, gongW, gong) {
    if (str == null || str.length != gong * gong)
        return str;
    var r = "";
    for (var i = 0; i < str.length; i++) {
        if (i % gong == 0) {
            r += "\n";
        }
        else if (i % gongW == 0) {
            r += " ";
        }
        r += str[i];
    }
    return r;
}
var _loop_1 = function (i) {
    var wh = dlx_1.default.getWH(i);
    var tag = "algorithm-x-".concat({ i: i });
    console.time(tag);
    var sudo = new Array(i * i).fill(0).map(function (_, idx) { return idx > i - 1 ? 0 : idx + 1; }).join('');
    (0, log_1.log)("{}", transitionStr2Matrix(dlx_1.default.solveStandardSudoku(sudo, i), wh[0], i));
    console.timeEnd(tag);
};
for (var i = 2; i < 10; i++) {
    _loop_1(i);
}
//# sourceMappingURL=dlx.test.js.map