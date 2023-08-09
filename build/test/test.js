"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithm = require("../algorithm/Algorithm");
var log_1 = require("../utils/log");
var dlx_1 = require("../algorithm/x/dlx");
var SwissSys_1 = require("../algorithm/swissSys/SwissSys");
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
function desRotation(r) {
    var round = r.round;
    var againsts = r.againsts;
    var str = "";
    for (var _i = 0, againsts_1 = againsts; _i < againsts_1.length; _i++) {
        var against = againsts_1[_i];
        str += "(".concat(against.first.serialNumber, "=");
        if (against.bye) {
            str += "bye";
        }
        else {
            str += "".concat(against.second.serialNumber);
        }
        str += "),";
    }
    console.log("[round:" + round + "]" + str);
}
function test() {
    // for(let i=1; i<100 ; i ++){
    //     let wh = dlx.getWH(i)
    //     console.log(i,wh[0],wh[1])
    // }
    var r1 = SwissSys_1.default.layoutFirst(9);
    desRotation(r1);
    // r1.againsts[1].first.scores+=1;
    var r2 = SwissSys_1.default.layoutNext([r1]);
    // r2.againsts[2].first.scores+=1;
    desRotation(r2);
    var r3 = SwissSys_1.default.layoutNext([r1, r2]);
    // r3.againsts[3].first.scores+=1;
    desRotation(r3);
    var r4 = SwissSys_1.default.layoutNext([r1, r2, r3]);
    desRotation(r4);
    var r5 = SwissSys_1.default.layoutNext([r1, r2, r3, r4]);
    desRotation(r5);
    var r6 = SwissSys_1.default.layoutNext([r1, r2, r3, r4, r5]);
    desRotation(r6);
    (0, log_1.log)("dfsQueen 8 is:{}", Algorithm.dfsQueen(8));
    (0, log_1.log)("AllN(3):{}", Algorithm.AllN(3));
    var ans = Algorithm.gaussSolutions([
        [1, 0, 5, 8],
        [3, 2, 3, 3],
        [-1, -3, 5, 7],
        [9, -5, 3, 6]
    ], [37, 34, 13, 26]);
    var _loop_1 = function (i) {
        var wh = dlx_1.default.getWH(i);
        var tag = "algorithm-x-".concat({ i: i });
        console.time(tag);
        var sudo = new Array(i * i).fill(0).map(function (_, idx) { return idx > i - 1 ? 0 : idx + 1; }).join('');
        (0, log_1.log)("{}", transitionStr2Matrix(dlx_1.default.solveStandardSudoku(sudo, i), wh[0], i));
        console.timeEnd(tag);
    };
    // log("gaussSolutions:{}",ans)
    // console.time("algorithm-x-9")
    // let sudoStr9 = "500002000400708001083000900000000390040070010065000000001000720800605009000900008"
    // log("problem 9:{}",transitionStr2Matrix(sudoStr9,3,9))
    // log("answer 9 :{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudoStr9,9),3,9))
    // console.timeEnd("algorithm-x-9")
    for (var i = 2; i < 10; i++) {
        _loop_1(i);
    }
}
test();
//# sourceMappingURL=test.js.map