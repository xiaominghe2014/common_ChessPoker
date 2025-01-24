"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var go;
(function (go) {
    go.EMPTY = 0;
    go.BLACK = 1;
    go.WHITE = 2;
    var Board = /** @class */ (function () {
        function Board(board, width) {
            this.width = width;
            this.board = board;
            this.height = board.length / width;
            this.capture = [0, 0];
            this.moveHistory = [];
            this.turn = go.BLACK;
            this.setABAW();
            this.originBoard = __spreadArray([], this.board, true);
        }
        Board.prototype.posColor = function (col, row) {
            return this.board[(row - 1) * this.width + col - 1];
        };
        Board.prototype.undo = function () {
            var step = this.moveHistory.length;
            if (step > 0) {
                var targetStep = step - 1;
                this.board = __spreadArray([], this.originBoard, true);
                var reMove = __spreadArray([], this.moveHistory, true);
                this.capture = [0, 0];
                this.moveHistory = [];
                this.turn = go.BLACK;
                this.setABAW();
                for (var s = 0; s < targetStep; s++) {
                    if (reMove[s] != null) {
                        this.makeMove(reMove[s]);
                    }
                    else {
                        this.pass();
                    }
                }
                return true;
            }
            return false;
        };
        Board.prototype.stepColAndRow = function (step) {
            if (step >= 0 && step < this.moveHistory.length) {
                var mv = this.moveHistory[step];
                if (mv != null) {
                    return {
                        col: (mv.pos % this.width) + 1,
                        row: ~~(mv.pos / this.width) + 1
                    };
                }
            }
            return null;
        };
        Board.prototype.setABAW = function () {
            var ab = "";
            var aw = "";
            for (var i = 0; i < this.board.length; i++) {
                if (this.board[i] == go.BLACK) {
                    ab += this.pos2Sgf(i);
                }
                ;
                if (this.board[i] == go.WHITE) {
                    aw += this.pos2Sgf(i);
                }
                ;
            }
            this.AB = ab;
            this.AW = aw;
        };
        Board.prototype.clearBoard = function () {
            for (var i = 0; i < this.board.length; i++) {
                this.board[i] = go.EMPTY;
            }
            this.capture[0] = 0;
            this.capture[1] = 0;
            this.moveHistory = [];
            this.turn = go.BLACK;
        };
        Board.prototype.makeMoveByColAndRow = function (col, row) {
            return this.makeMove({ color: this.turn, pos: (row - 1) * this.width + col - 1 });
        };
        /**
         * 一、有子，不能下
         * 二、无子
         *       1 有气 可下
         *       2 无气
         *         2.1 可提子/对方子无气
         *           2.1.1 打劫判断
         *         2.2 不可下
         *
         * @param mv
         */
        Board.prototype.makeMove = function (mv) {
            if (mv == null) {
                this.pass();
                return true;
            }
            if (this.turn != mv.color)
                return false;
            var pos = mv.pos;
            if (pos < 0 || pos > this.board.length - 1)
                return false;
            if (this.board[pos] != go.EMPTY)
                return false;
            var result = this.tryMove(mv);
            if (result != null) {
                var info = result.info;
                for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
                    var i = info_1[_i];
                    this.capture[this.turn - 1] += 1;
                    this.board[i] = go.EMPTY;
                }
                this.board[pos] = this.turn;
                mv.result = result;
                this.moveHistory.push(mv);
                this.changeTurn();
                return true;
            }
            return false;
        };
        Board.prototype.otherColor = function () {
            return go.BLACK == this.turn ? go.WHITE : go.BLACK;
        };
        Board.prototype.changeTurn = function () {
            this.turn = this.otherColor();
        };
        Board.prototype.searchInfo = function (board, info, searchPos, color) {
            if (info.indexOf(searchPos) == -1) {
                var cNeighbors = { liberty: 0, neighbors: [] };
                this.searchNeighbors(cNeighbors, board, searchPos, color, null);
                if (cNeighbors.liberty == 0) {
                    info = info.concat.apply(info, cNeighbors.neighbors);
                }
            }
            return info;
        };
        Board.prototype.tryMove = function (mv) {
            var _a, _b;
            var newBoard = this.board.slice(0);
            var pos = mv.pos;
            newBoard[pos] = mv.color;
            var cNeighbors = { liberty: 0, neighbors: [] };
            this.searchNeighbors(cNeighbors, newBoard, pos, mv.color, null);
            var info = new Array();
            var x = pos % this.width;
            var y = ~~(pos / this.width);
            if (x > 0)
                info = this.searchInfo(newBoard, info, pos - 1, this.otherColor());
            if (x < this.width - 1)
                info = this.searchInfo(newBoard, info, pos + 1, this.otherColor());
            if (y > 0)
                info = this.searchInfo(newBoard, info, pos - this.width, this.otherColor());
            if (y < this.height - 1)
                info = this.searchInfo(newBoard, info, pos + this.width, this.otherColor());
            if (cNeighbors.liberty == 0) {
                if (info.length == 0)
                    return null;
                if (info.length == 1) {
                    var lastMvPos = info[0];
                    var lastCapturePos = pos;
                    if (this.moveHistory.length > 0) {
                        var lastMv = this.moveHistory[this.moveHistory.length - 1];
                        if (lastMv != null && lastMv.pos == lastMvPos) {
                            if (((_a = lastMv.result) === null || _a === void 0 ? void 0 : _a.info.length) == 1 && ((_b = lastMv.result) === null || _b === void 0 ? void 0 : _b.info[0]) == lastCapturePos) {
                                return null;
                            }
                        }
                    }
                }
                var result = { result: true, info: info };
                return result;
            }
            else {
                var result = { result: true, info: info };
                return result;
            }
        };
        Board.prototype.searchNeighbors = function (cNeighbors, board, searchPos, color, searchList) {
            if (searchList == null)
                searchList = [];
            if (searchPos < 0 || searchPos > board.length - 1)
                return;
            if (searchList.indexOf(searchPos) != -1)
                return;
            searchList.push(searchPos);
            var piece = board[searchPos];
            if (piece == color) {
                cNeighbors.neighbors.push(searchPos);
                var x = searchPos % this.width;
                var y = ~~(searchPos / this.width);
                if (x > 0)
                    this.searchNeighbors(cNeighbors, board, searchPos - 1, color, searchList);
                if (x < this.width - 1)
                    this.searchNeighbors(cNeighbors, board, searchPos + 1, color, searchList);
                if (y > 0)
                    this.searchNeighbors(cNeighbors, board, searchPos - this.width, color, searchList);
                if (y < this.height - 1)
                    this.searchNeighbors(cNeighbors, board, searchPos + this.width, color, searchList);
            }
            else if (piece == go.EMPTY) {
                cNeighbors.liberty += 1;
            }
        };
        Board.prototype.boardStr = function (board) {
            var columnTag = "  ";
            for (var i = 65; i < this.width + 65; i++) {
                columnTag += " " + String.fromCharCode(i < 73 ? i : (i + 1));
            }
            columnTag += "\n";
            var boardStr = "";
            for (var i = 0; i < this.height; i++) {
                boardStr += this.height - i > 9 ? "" + (this.height - i) : " " + (this.height - i);
                for (var j = 0; j < this.width; j++) {
                    var piece = board[i * this.width + j];
                    if (go.EMPTY == piece) {
                        boardStr += " .";
                    }
                    if (go.BLACK == piece) {
                        boardStr += " X";
                    }
                    if (go.WHITE == piece) {
                        boardStr += " O";
                    }
                }
                boardStr += "\n";
            }
            return columnTag + boardStr;
        };
        Board.prototype.showBoard = function () {
            return this.boardStr(this.board);
        };
        Board.prototype.play = function (coord) {
            if (coord.length > 0) {
                var x = coord.substring(0, 1).toUpperCase();
                var y = coord.substring(1);
                var xx = x.charCodeAt(0) - 65;
                if (xx >= 8)
                    xx -= 1;
                var yy = this.height - parseInt(y);
                return this.makeMove({ color: this.turn, pos: yy * this.width + xx });
            }
            return false;
        };
        Board.prototype.pass = function () {
            this.moveHistory.push(null);
            this.changeTurn();
        };
        Board.prototype.lastPassCnt = function () {
            var cnt = 0;
            var size = this.moveHistory.length;
            for (var i = size - 1; i > 0; i--) {
                var goMove = this.moveHistory[i];
                if (goMove == null)
                    cnt++;
                else
                    break;
            }
            return cnt;
        };
        Board.prototype.getMvList = function () {
            var mvList = [];
            for (var i = 0; i < this.board.length; i++) {
                if (this.board[i] == go.EMPTY) {
                    var mv = { color: this.turn, pos: i };
                    var result = this.tryMove(mv);
                    if (result != null) {
                        mvList.push(mv);
                    }
                }
            }
            return mvList;
        };
        Board.prototype.isEye = function (pos, color, maxArea) {
            var eye = [];
            this.searchEye(eye, pos, color, null, maxArea);
            return eye.length > 0;
        };
        Board.prototype.searchEye = function (eye, searchPos, color, searchList, maxEyeArea) {
            if (searchList == null)
                searchList = [];
            if (searchPos < 0 || searchPos > this.board.length - 1)
                return;
            if (searchList.indexOf(searchPos) != -1)
                return;
            searchList.push(searchPos);
            var piece = this.board[searchPos];
            if (piece == go.EMPTY) {
                eye.push(searchPos);
                if (eye.length > maxEyeArea) {
                    eye = [];
                    return;
                }
                var x = searchPos % this.width;
                var y = ~~(searchPos / this.width);
                if (x > 0)
                    this.searchEye(eye, searchPos - 1, color, searchList, maxEyeArea);
                if (x < this.width - 1 && eye.length > 0)
                    this.searchEye(eye, searchPos + 1, color, searchList, maxEyeArea);
                if (y > 0 && eye.length > 0)
                    this.searchEye(eye, searchPos - this.width, color, searchList, maxEyeArea);
                if (y < this.height - 1 && eye.length > 0)
                    this.searchEye(eye, searchPos + this.width, color, searchList, maxEyeArea);
            }
            else if (piece != color) {
                //失败
                eye = [];
            }
        };
        Board.prototype.getLastSgfMv = function () {
            var s = this.moveHistory.length;
            if (s > 0) {
                var mv = this.moveHistory[s - 1];
                if (mv == null) {
                    return (this.otherColor() == go.BLACK ? "B" : "W") + "[]";
                }
                var pos = mv.pos;
                return (this.otherColor() == go.BLACK ? "B" : "W") + this.pos2Sgf(pos);
            }
            return null;
        };
        Board.prototype.getSgfMv = function (idx) {
            var s = this.moveHistory.length;
            if (s > 0 && idx < s && idx >= 0) {
                var mv = this.moveHistory[idx];
                if (mv == null) {
                    return ((idx % 2 == 0) ? "B" : "W") + "[]";
                }
                var pos = mv.pos;
                return ((idx % 2 == 0) ? "B" : "W") + this.pos2Sgf(pos);
            }
            return null;
        };
        Board.prototype.pos2Sgf = function (pos) {
            var x = pos % this.width;
            var y = ~~(pos / this.width);
            return "[" + String.fromCharCode(x + 97) + String.fromCharCode(y + 97) + "]";
        };
        Board.prototype.getLastGTPMv = function () {
            var s = this.moveHistory.length;
            if (s > 0) {
                var mv = this.moveHistory[s - 1];
                if (mv == null) {
                    return "play " + (this.otherColor() == go.BLACK ? "black " : "white ") + "pass";
                }
                var pos = mv.pos;
                var x = pos % this.width;
                var y = ~~(pos / this.width);
                var cx = x + 97;
                if (cx > 104)
                    cx += 1;
                var cy = this.height - y;
                return (this.otherColor() == go.BLACK ? "play black " : "play white ") + String.fromCharCode(cx) + cy;
            }
            return '';
        };
        Board.prototype.totalStep = function () {
            return this.moveHistory.length;
        };
        Board.prototype.sgf = function () {
            //let s = "(;FF[4]KM[7.5]RU[Chinese]GM[1]RE[W+65.75]SZ[19]GN[5分 30秒]PW[棋友800b]AP[弈战2.0]DT[2020-04-22]BR[18K]EV[5分 30秒]PB[棋友e875]HA[0]TM[0]WR[18K]CA[utf-8];B[kc];W[dp];B[co];W[cp];B[bo];W[do];B[cm];W[dm];B[dl];W[em];B[el];W[fl];B[fk];W[gk];B[fj];W[gl];B[hj];W[gj];B[fi];W[gi];B[fh];W[hg];B[gg];W[hf];B[gh];W[hh];B[jg];W[gf];B[ff];W[fe];B[ef];W[ee];B[df];W[de];B[ce];W[cd];B[be];W[id];B[ic];W[hc];B[ib];W[hd];B[fc];W[hb];B[ha];W[ga];B[ia];W[fb];B[eb];W[dc];B[cb];W[bd];B[db];W[ae];B[bf];W[ab];B[af];W[ad];B[bc];W[ac];B[cc];W[kd];B[ld];W[jc];B[ke];W[jd];B[le];W[lc];B[mc];W[kb];B[lb];W[pp];B[kc];W[qd];B[qe];W[pd];B[rd];W[rc];B[rb];W[re];B[rf];W[sd];B[qb];W[pb];B[ob];W[pa];B[oa];W[oc];B[nb];W[qm];B[qf];W[qj];B[sf];W[of];B[se];W[rd];B[sb];W[oh];B[ng];W[og];B[nf];W[ne];B[nd];W[oe];B[od];W[pe];B[nc];W[pc];B[lc];W[qh];B[nh];W[ni];B[mi];W[mj];B[lj];W[nj];B[lk];W[mh];B[li];W[mf];B[me];W[lm];B[ka];W[jb];B[je];W[ml];B[mk];W[nk];B[nl];W[nm];B[ol];W[om];B[pl];W[pm];B[ql];W[rl];B[rk];W[rm];B[rp];W[qq];B[rq];W[rr];B[qp];W[pq];B[qr];W[pr];B[rs];W[qs];B[sr];W[ss];B[sq];W[qo];B[ro];W[rn];B[so];W[rs];B[nq];W[sn];B[oq];W[lq];B[lr];W[kr];B[kq];W[mr];B[jr];W[ls];B[js];W[gq];B[hr];W[gr];B[hq];W[kp];B[jq];W[lo];B[iq];W[gp];B[ho];W[jo];B[jp];W[io];B[ip];W[hp];B[go];W[fo];B[dn];W[en];B[cn];W[bp];B[ap];W[aq];B[ao];W[br];B[bn];W[hs];B[is];W[gs];B[fp];W[ks];B[ll];W[mm];B[km];W[kn];B[jn];W[in];B[jm];W[im];B[il];W[ik];B[jk];W[hl];B[jl];W[ij];B[jj];W[ii];B[ji];W[ir];B[ih];W[ja];B[la];W[sp];B[ro])"
            var book = "(;GM[1]FF[4]RU[Chinese]SZ[" + this.width + "]";
            if (this.AB != "") {
                book += "AB" + this.AB;
            }
            if (this.AW != "") {
                book += "AW" + this.AW;
            }
            book += ";";
            var s = this.moveHistory.length;
            for (var i = 0; i < s; i++) {
                if (i == s - 1)
                    book += this.getSgfMv(i) + ")";
                else
                    book += this.getSgfMv(i) + ";";
            }
            return book;
        };
        return Board;
    }());
    go.Board = Board;
})(go || (go = {}));
exports.default = go;
//# sourceMappingURL=gobard.js.map