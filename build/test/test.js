"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithm = require("../algorithm/Algorithm");
var log_1 = require("../utils/log");
var dlx_1 = require("../algorithm/x/dlx");
function getArr(i, v, gong) {
    var x = i % gong;
    var y = Math.floor(i / gong);
    var gongW = Math.sqrt(gong);
    var gongH = Math.sqrt(gong);
    var arr = new Array(gong * gong * 4).fill(0);
    var c1 = i;
    var c2 = gong * gong + x * gong + v - 1;
    var c3 = gong * gong * 2 + y * gong + v - 1;
    var gongX = Math.floor(x / gongW);
    var gongY = Math.floor(y / gongH);
    var gongP = gongX + gongY * Math.sqrt(gong);
    var c4 = gong * gong * 3 + gongP * gong + v - 1;
    arr[c1] = 1;
    arr[c2] = 1;
    arr[c3] = 1;
    arr[c4] = 1;
    return arr;
}
function test() {
    log_1.log("dfsQueen 8 is:{}", Algorithm.dfsQueen(8));
    log_1.log("AllN(3):{}", Algorithm.AllN(3));
    var ans = Algorithm.gaussSolutions([
        [1, 0, 5, 8],
        [3, 2, 3, 3],
        [-1, -3, 5, 7],
        [9, -5, 3, 6]
    ], [37, 34, 13, 26]);
    log_1.log("gaussSolutions:{}", ans);
    console.time("algorithm-x");
    var sudoStr = "004100000000030060105000020680001200002000300003400058040000601030020000000004700";
    var gong = 9;
    var sudoArr = [];
    var rowArr = [];
    for (var i = 0; i < gong * gong; i++) {
        var v = parseInt(sudoStr.charAt(i));
        if (v == 0) {
            for (var j = 1; j <= gong; j++) {
                sudoArr.push(getArr(i, j, gong));
                rowArr.push([i, j]);
            }
        }
        else {
            sudoArr.push(getArr(i, v, gong));
            rowArr.push([i, v]);
        }
        // testGongPos(i,gong)
    }
    //找出空列，删除
    var kongIdx = [];
    for (var i = 0; i < sudoArr[0].length; i++) {
        var len_1 = sudoArr.length;
        var kong = true;
        for (var j = 0; j < len_1; j++) {
            if (sudoArr[j][i] != 0) {
                kong = false;
                break;
            }
        }
        if (kong) {
            kongIdx.push(i);
        }
    }
    var sudoArrNoBlank = [];
    var len = sudoArr.length;
    for (var j = 0; j < len; j++) {
        var noBlank = [];
        for (var i = 0; i < sudoArr[0].length; i++) {
            if (kongIdx.indexOf(i) == -1) {
                noBlank.push(sudoArr[j][i]);
            }
        }
        sudoArrNoBlank.push(noBlank);
    }
    var dx = new dlx_1.default.Dlx(sudoArr);
    var success = dx.dancing(0);
    log_1.log("success:{}", success);
    var ansArr = [];
    for (var i = 0; i < dx.answer.length; i++) {
        if (dx.answer[i] > 0) {
            ansArr.push(dx.answer[i]);
        }
    }
    var ansA = new Array(gong * gong).fill(0);
    for (var i = 0; i < ansArr.length; i++) {
        var a = rowArr[ansArr[i] - 1];
        ansA[a[0]] = a[1];
    }
    log_1.log("answer:{}", ansA.join(""));
    console.timeEnd("algorithm-x");
}
test();
//# sourceMappingURL=test.js.map