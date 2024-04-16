"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithm = require("../src/algorithm/Algorithm");
var log_1 = require("../src/utils/log");
(0, log_1.log)("dfsQueen 8 is:{}", Algorithm.dfsQueen(8));
(0, log_1.log)("AllN(3):{}", Algorithm.AllN(3));
var ans = Algorithm.gaussSolutions([
    [1, 0, 5, 8],
    [3, 2, 3, 3],
    [-1, -3, 5, 7],
    [9, -5, 3, 6]
], [37, 34, 13, 26]);
(0, log_1.log)("Algorithm.gaussSolutions:{}", ans);
//# sourceMappingURL=algorithm.test.js.map