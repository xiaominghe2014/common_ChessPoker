"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dlx;
(function (dlx) {
    var Node = /** @class */ (function () {
        function Node() {
            this.left = this;
            this.right = this;
            this.up = this;
            this.down = this;
            this.column = this;
            this.row = 0;
            this.size = 0;
        }
        return Node;
    }());
    dlx.Node = Node;
    var Dlx = /** @class */ (function () {
        function Dlx(data) {
            this.answer = [];
            this.head = new Node;
            this.head.name = "h";
            var lenX = data[0].length;
            var lenY = data.length;
            for (var i = 0; i < lenY; i++) {
                this.answer.push(-1);
            }
            this.columnNodes = [];
            for (var i = 0; i < lenX; i++) {
                this.columnNodes.push(new Node);
                this.columnNodes[i].left = i > 0 ? this.columnNodes[i - 1] : this.head;
                this.columnNodes[i].left.right = this.columnNodes[i];
                this.columnNodes[i].name = "c" + i;
            }
            this.columnNodes[lenX - 1].right = this.head;
            for (var i = 0; i < lenY; i++) {
                for (var j = 0; j < lenX; j++) {
                    if (data[i][j] != 0) {
                        var row = i + 1;
                        var left = this.lastRowNode(row);
                        var right = this.firstRowNode(row);
                        var node = new Node;
                        node.name = "c" + j + "-" + i;
                        node.row = row;
                        node.column = this.columnNodes[j];
                        this.columnNodes[j].size++;
                        node.up = this.lastDownNode(j);
                        node.up.down = node;
                        node.down = this.columnNodes[j];
                        this.columnNodes[j].up = node;
                        if (left != null) {
                            node.left = left;
                            node.left.right = node;
                        }
                        if (right != null) {
                            node.right = right;
                            node.right.left = node;
                        }
                    }
                }
            }
        }
        Dlx.prototype.lastDownNode = function (column) {
            var node = this.columnNodes[column];
            while (node.down != this.columnNodes[column])
                node = node.down;
            return node;
        };
        Dlx.prototype.lastRowNode = function (row) {
            var maxX = this.columnNodes.length;
            for (var j = maxX - 1; j >= 0; j--) {
                var node = this.columnNodes[j];
                while (node.down != this.columnNodes[j]) {
                    node = node.down;
                    if (node.row == row)
                        return node;
                    if (node.row > row)
                        break;
                }
            }
            return null;
        };
        Dlx.prototype.firstRowNode = function (row) {
            var maxX = this.columnNodes.length;
            for (var i = 0; i < maxX; i++) {
                var node = this.columnNodes[i];
                while (node.down != this.columnNodes[i]) {
                    node = node.down;
                    if (node.row == row)
                        return node;
                    if (node.row > row)
                        break;
                }
            }
            return null;
        };
        Dlx.prototype.cover = function (node) {
            node.right.left = node.left;
            node.left.right = node.right;
            for (var i = node.down; i != node; i = i.down) {
                //每一列
                for (var j = i.right; j != i; j = j.right) {
                    //每一行
                    j.down.up = j.up;
                    j.up.down = j.down;
                    j.column.size--;
                }
            }
        };
        Dlx.prototype.uncover = function (node) {
            for (var i = node.up; i != node; i = i.up) {
                for (var j = i.left; j != i; j = j.left) {
                    j.down.up = j.up.down = j;
                    j.column.size++;
                }
            }
            node.right.left = node.left.right = node;
        };
        Dlx.prototype.dancing = function (d) {
            if (this.head.right == this.head)
                return true;
            var col = this.head.right;
            for (var node = this.head.right; node != this.head; node = node.right) {
                if (node.size < col.size)
                    col = node;
            }
            if (col.size < 1)
                return false;
            this.cover(col);
            for (var node = col.down; node != col; node = node.down) {
                this.answer[d] = node.row;
                for (var nj = node.right; nj != node; nj = nj.right)
                    this.cover(nj.column);
                if (this.dancing(d + 1))
                    return true;
                for (var nj = node.left; nj != node; nj = nj.left)
                    this.uncover(nj.column);
            }
            this.uncover(col);
            return false;
        };
        return Dlx;
    }());
    dlx.Dlx = Dlx;
    function solveStandardSudoku(subject, gong) {
        var getSquare = function (n) {
            if (n % 1 != 0)
                return -1;
            var i = 1;
            for (; n > 0; i += 2) {
                n -= i;
            }
            if (n == 0) {
                return (i - 1) / 2;
            }
            return -1;
        };
        var getArr = function (gongW, gongH, i, v, gong) {
            var x = i % gong;
            var y = Math.floor(i / gong);
            var arr = new Array(gong * gong * 4).fill(0);
            var c1 = i;
            var c2 = gong * gong + x * gong + v - 1;
            var c3 = gong * gong * 2 + y * gong + v - 1;
            var gongX = Math.floor(x / gongW);
            var gongY = Math.floor(y / gongH);
            var gongP = gongX + gongY * Math.floor(gong / gongW);
            var c4 = gong * gong * 3 + gongP * gong + v - 1;
            arr[c1] = 1;
            arr[c2] = 1;
            arr[c3] = 1;
            arr[c4] = 1;
            return arr;
        };
        if (subject.length != gong * gong)
            return null;
        var sq = getWH(gong);
        var gongW = sq[0];
        var gongH = sq[1];
        if (gongW == -1)
            return null;
        var sudoArr = [];
        var rowArr = [];
        for (var i = 0; i < gong * gong; i++) {
            var v = subject.charCodeAt(i) - '0'.charCodeAt(0);
            if (v == 0) {
                for (var j = 1; j <= gong; j++) {
                    sudoArr.push(getArr(gongW, gongH, i, j, gong));
                    rowArr.push([i, j]);
                }
            }
            else {
                sudoArr.push(getArr(gongW, gongH, i, v, gong));
                rowArr.push([i, v]);
            }
        }
        var dx = new Dlx(sudoArr);
        var result = dx.dancing(0);
        if (result) {
            var ansA = new Array(gong * gong).fill(0);
            for (var i = 0; i < dx.answer.length; i++) {
                if (dx.answer[i] > 0) {
                    var a = rowArr[dx.answer[i] - 1];
                    ansA[a[0]] = a[1];
                }
            }
            return ansA.join("");
        }
        return null;
    }
    dlx.solveStandardSudoku = solveStandardSudoku;
    function getWH(g) {
        var wh = [g, 1];
        for (var i = 2; i <= g; i++) {
            var j = g / i;
            if (i > j)
                return wh;
            if (g % i == 0) {
                if (i + j < wh[0] + wh[1]) {
                    wh[0] = j;
                    wh[1] = i;
                }
            }
        }
        return wh;
    }
    dlx.getWH = getWH;
})(dlx || (dlx = {}));
exports.default = dlx;
//# sourceMappingURL=dlx.js.map