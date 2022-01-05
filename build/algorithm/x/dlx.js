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
})(dlx || (dlx = {}));
exports.default = dlx;
//# sourceMappingURL=dlx.js.map