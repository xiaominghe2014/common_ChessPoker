"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../src/utils/log");
var SwissSys_1 = require("../src/algorithm/swissSys/SwissSys");
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
    (0, log_1.log)("[round:" + round + "]" + str);
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
    // log("gaussSolutions:{}",ans)
    // console.time("algorithm-x-9")
    // let sudoStr9 = "500002000400708001083000900000000390040070010065000000001000720800605009000900008"
    // log("problem 9:{}",transitionStr2Matrix(sudoStr9,3,9))
    // log("answer 9 :{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudoStr9,9),3,9))
    // console.timeEnd("algorithm-x-9")
}
test();
//# sourceMappingURL=test.js.map