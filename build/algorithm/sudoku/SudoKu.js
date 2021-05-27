"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SudoKu = void 0;
var SudoKu = /** @class */ (function () {
    /**
     *
     * @param sudoKuOrigin 标准数独的题目字符串 9x9
     */
    function SudoKu(sudoKuOrigin) {
        this.sudoKuOrigin = sudoKuOrigin;
        this.solveSudoku = [];
        var arr = sudoKuOrigin.split("").map(function (v) { return parseInt(v); });
        var _loop_1 = function (i) {
            var tmp = [];
            var _loop_2 = function (j) {
                var origin_1 = arr[i * 9 + j]; //i 行 j列
                if (origin_1 != 0) {
                    tmp.push([origin_1]);
                }
                else {
                    //考虑行列以及九宫格中的约束
                    var possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    var _loop_3 = function (r) {
                        if (r != j) {
                            possible = possible.filter(function (v) { return v != arr[i * 9 + r]; });
                        }
                    };
                    //行 row
                    for (var r = 0; r < 9; r++) {
                        _loop_3(r);
                    }
                    var _loop_4 = function (c) {
                        if (c != i) {
                            possible = possible.filter(function (v) { return v != arr[c * 9 + j]; });
                        }
                    };
                    //列 column
                    for (var c = 0; c < 9; c++) {
                        _loop_4(c);
                    }
                    // 九宫格
                    //九宫格的坐标
                    var x = j % 3, y = i % 3;
                    for (var h = 0; h < 3; h++) {
                        var _loop_5 = function (l) {
                            if (h == x && l == y)
                                return "continue";
                            var idx = i * 9 + j + h - x + (l - y) * 9;
                            var p = arr[idx];
                            possible = possible.filter(function (v) { return v != p; });
                        };
                        for (var l = 0; l < 3; l++) {
                            _loop_5(l);
                        }
                    }
                    tmp.push(possible);
                }
            };
            for (var j = 0; j < 9; j++) {
                _loop_2(j);
            }
            this_1.solveSudoku.push(tmp);
        };
        var this_1 = this;
        for (var i = 0; i < 9; i++) {
            _loop_1(i);
        }
    }
    SudoKu.prototype.print = function () {
        var des = "\n";
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                var arr = this.solveSudoku[y][x];
                var str = "";
                for (var i = 0; i < arr.length; i++) {
                    str += arr[i];
                }
                des += str + " ";
            }
            des += "\n";
        }
        console.log(des);
    };
    SudoKu.prototype.isSolved = function () {
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                if (this.solveSudoku[x][y].length > 1)
                    return false;
            }
        }
        return true;
    };
    SudoKu.prototype.solve = function () {
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                //过滤 x,y坐标的值是否冲突
                this.check(x, y);
                if (this.isSolved())
                    return this.getSolved();
            }
        }
        return this.solve();
    };
    SudoKu.prototype.getSolved = function () {
        var r = [];
        for (var i = 0; i < 9; i++) {
            var tmp = [];
            for (var j = 0; j < 9; j++) {
                tmp.push(this.solveSudoku[i][j][0]);
            }
            r.push(tmp);
        }
        return r;
    };
    SudoKu.prototype.unique = function (x, y, p) {
        //去除同行同列的可能性
        //行 row
        for (var r = 0; r < 9; r++) {
            if (r != x) {
                if (this.solveSudoku[y][r].length > 1)
                    this.solveSudoku[y][r] = this.solveSudoku[y][r].filter(function (v) { return v != p; });
            }
        }
        //列
        for (var l = 0; l < 9; l++) {
            if (l != y) {
                if (this.solveSudoku[l][x].length > 1)
                    this.solveSudoku[l][x] = this.solveSudoku[l][x].filter(function (v) { return v != p; });
            }
        }
    };
    /**
     * 检查x列y行的值是否有冲突
     * @param x
     * @param y
     */
    SudoKu.prototype.check = function (x, y) {
        var possible = this.solveSudoku[y][x];
        if (possible.length == 1) {
            var p = possible[0];
            this.unique(x, y, p);
            return true;
        }
        var _loop_6 = function (r) {
            if (r != x) {
                var p_1 = this_2.solveSudoku[y][r];
                if (p_1.length == 1)
                    possible = possible.filter(function (v) { return v != p_1[0]; });
            }
        };
        var this_2 = this;
        //行 row
        for (var r = 0; r < 9; r++) {
            _loop_6(r);
        }
        var _loop_7 = function (l) {
            if (l != y) {
                var p_2 = this_3.solveSudoku[l][x];
                if (p_2.length == 1)
                    possible = possible.filter(function (v) { return v != p_2[0]; });
            }
        };
        var this_3 = this;
        //列
        for (var l = 0; l < 9; l++) {
            _loop_7(l);
        }
        //九宫
        //九宫格的坐标
        var xx = x % 3, yy = y % 3;
        for (var h = 0; h < 3; h++) {
            var _loop_8 = function (l) {
                if (h != xx && yy != l) {
                    var p_3 = this_4.solveSudoku[y + (l - yy)][x + (h - xx)];
                    if (p_3.length == 1)
                        possible = possible.filter(function (v) { return v != p_3[0]; });
                }
            };
            var this_4 = this;
            for (var l = 0; l < 3; l++) {
                _loop_8(l);
            }
        }
        //确定九宫之内是否只有自己有可能
        if (possible.length > 1) {
            for (var m = 0; m < possible.length; m++) {
                var pp = true;
                var target = possible[m];
                for (var h = 0; h < 3; h++) {
                    for (var l = 0; l < 3; l++) {
                        if (h == xx && yy == l)
                            continue;
                        var p = this.solveSudoku[y + (l - yy)][x + (h - xx)];
                        if (p.indexOf(target) != -1) {
                            pp = false;
                            //跳出循环
                            h = l = 3;
                        }
                    }
                }
                if (pp) {
                    this.solveSudoku[y][x] = [possible[m]];
                    return true;
                }
            }
        }
        this.solveSudoku[y][x] = possible;
        if (possible.length == 1) {
            var p = possible[0];
            this.unique(x, y, p);
        }
        return possible.length == 1;
    };
    return SudoKu;
}());
exports.SudoKu = SudoKu;
//# sourceMappingURL=SudoKu.js.map