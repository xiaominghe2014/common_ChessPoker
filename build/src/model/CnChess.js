"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CnChess;
(function (CnChess) {
    CnChess.BOARD_WIDTH = 9;
    CnChess.BOARD_HEIGHT = 10;
    CnChess.BOARD_SIZE = CnChess.BOARD_WIDTH * CnChess.BOARD_HEIGHT;
    CnChess.xy2idx = function (x, y, width) {
        return y * width + x;
    };
    CnChess.idx2xy = function (idx, width) {
        return [idx % width, Math.floor(idx / width)];
    };
    var Color;
    (function (Color) {
        Color[Color["EMPTY"] = 0] = "EMPTY";
        Color[Color["RED"] = 1] = "RED";
        Color[Color["BLACK"] = 2] = "BLACK";
    })(Color = CnChess.Color || (CnChess.Color = {}));
    var PieceType;
    (function (PieceType) {
        PieceType[PieceType["EMPTY"] = 0] = "EMPTY";
        PieceType[PieceType["KING"] = 1] = "KING";
        PieceType[PieceType["ADVISOR"] = 2] = "ADVISOR";
        PieceType[PieceType["BISHOP"] = 3] = "BISHOP";
        PieceType[PieceType["KNIGHT"] = 4] = "KNIGHT";
        PieceType[PieceType["ROOK"] = 5] = "ROOK";
        PieceType[PieceType["CANNON"] = 6] = "CANNON";
        PieceType[PieceType["PAWN"] = 7] = "PAWN";
    })(PieceType = CnChess.PieceType || (CnChess.PieceType = {}));
    CnChess.Piece2Fen = function (piece) {
        if (piece.type === PieceType.EMPTY) {
            return "";
        }
        var pieceArr = ["K", "A", "B", "N", "R", "C", "P"];
        if (piece.color === Color.RED) {
            return pieceArr[piece.type - 1].toUpperCase();
        }
        else {
            return pieceArr[piece.type - 1].toLowerCase();
        }
    };
    CnChess.Fen2Piece = function (fen) {
        if (fen === "") {
            return { color: Color.EMPTY, type: PieceType.EMPTY };
        }
        var pieceArr = ["K", "A", "B", "N", "R", "C", "P"];
        var color = fen === fen.toUpperCase() ? Color.RED : Color.BLACK;
        var type = pieceArr.indexOf(fen.toUpperCase()) + 1;
        return { color: color, type: type };
    };
    CnChess.Piece2String = function (piece) {
        if (piece.type === PieceType.EMPTY) {
            return "  ";
        }
        var pieceArrBlack = ["將", "士", "象", "馬", "車", "砲", "卒"];
        var pieceArrRed = ["帅", "仕", "相", "傌", "俥", "炮", "兵"];
        if (piece.color === Color.RED) {
            return pieceArrRed[piece.type - 1];
        }
        else {
            return pieceArrBlack[piece.type - 1];
        }
    };
    var GameResult;
    (function (GameResult) {
        GameResult[GameResult["RED_WIN"] = 1] = "RED_WIN";
        GameResult[GameResult["DRAW"] = 0] = "DRAW";
        GameResult[GameResult["BLACK_WIN"] = -1] = "BLACK_WIN";
    })(GameResult = CnChess.GameResult || (CnChess.GameResult = {}));
    var DEFAULT_FEN = "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";
    var Game = /** @class */ (function () {
        function Game(fen) {
            if (fen === void 0) { fen = DEFAULT_FEN; }
            this.fromFen(fen);
        }
        Game.prototype.isWithinBounds = function (x, y) {
            return x >= 0 && x < this.width && y >= 0 && y < this.height;
        };
        Game.prototype.pieceAt = function (x, y) {
            return this.board[x + y * this.width];
        };
        Game.prototype.setPieceAt = function (x, y, piece) {
            this.board[x + y * this.width] = piece;
        };
        Game.prototype.otherColor = function (color) {
            return color === Color.BLACK ? Color.RED : Color.BLACK;
        };
        Game.prototype.findKingPosition = function (color) {
            for (var i = 0; i < this.board.length; i++) {
                if (this.board[i].type === PieceType.KING &&
                    this.board[i].color === color) {
                    return CnChess.idx2xy(i, this.width);
                }
            }
            return [-1, -1];
        };
        Game.prototype.kingCanMoves = function (x, y, color) {
            if (this.turn !== color) {
                return [];
            }
            var moves = [];
            var palace_x = [3, 4, 5];
            var palace_y = Color.BLACK === color ? [0, 1, 2] : [7, 8, 9];
            var directions = [
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
            ]; // up, down, right, left
            var otherColor = this.otherColor(color);
            var kingPos = this.findKingPosition(otherColor);
            for (var i = 0; i < directions.length; i++) {
                var dx = directions[i][0];
                var dy = directions[i][1];
                var nx = x + dx;
                var ny = y + dy;
                if (palace_x.includes(nx) && palace_y.includes(ny)) {
                    var p = this.pieceAt(nx, ny);
                    if (p.color !== color) {
                        if (p.color === Color.EMPTY) {
                            // 考虑白脸将
                            var hasPiece = false;
                            if (nx == kingPos[0]) {
                                var min_y = Math.min(ny, kingPos[1]);
                                var max_y = Math.max(ny, kingPos[1]);
                                for (var j = min_y + 1; j < max_y; j++) {
                                    if (this.pieceAt(nx, j).color !== Color.EMPTY) {
                                        hasPiece = true;
                                        break;
                                    }
                                }
                                if (hasPiece) {
                                    moves.push(CnChess.xy2idx(nx, ny, this.width));
                                }
                            }
                        }
                        else {
                            moves.push(CnChess.xy2idx(nx, ny, this.width));
                        }
                    }
                }
            }
            return moves;
        };
        Game.prototype.bishopCanMoves = function (x, y, color) {
            if (this.turn !== color) {
                return [];
            }
            var moves = [];
            var riverX = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            var riverY = color === Color.BLACK ? [0, 1, 2, 3, 4] : [5, 6, 7, 8, 9];
            var directions = [
                [-2, -2],
                [2, 2],
                [-2, 2],
                [2, -2],
            ]; // 左上，右上，左下，右下
            for (var i = 0; i < directions.length; i++) {
                var dx = directions[i][0];
                var dy = directions[i][1];
                var nx = x + dx;
                var ny = y + dy;
                if (riverX.includes(nx) && riverY.includes(ny)) {
                    // 考虑卡象眼的情况
                    var eye_x = x + dx / 2;
                    var eye_y = y + dy / 2;
                    if (this.pieceAt(eye_x, eye_y).color === Color.EMPTY) {
                        moves.push(CnChess.xy2idx(nx, ny, this.width));
                    }
                }
            }
            return moves;
        };
        Game.prototype.knightCanMoves = function (x, y, color) {
            if (this.turn !== color) {
                return [];
            }
            var moves = [];
            var directions = [
                [-1, -2],
                [-1, 2],
                [1, -2],
                [1, 2],
                [-2, -1],
                [-2, 1],
                [2, -1],
                [2, 1],
            ];
            var directionLegs = [
                [0, -1],
                [0, 1],
                [0, -1],
                [0, 1],
                [-1, 0],
                [-1, 0],
                [1, 0],
                [1, 0],
            ];
            for (var i = 0; i < directions.length; i++) {
                var dx = directions[i][0];
                var dy = directions[i][1];
                var nx = x + dx;
                var ny = y + dy;
                if (this.isWithinBounds(nx, ny)) {
                    var leg_x = x + directionLegs[i][0];
                    var leg_y = y + directionLegs[i][1];
                    if (this.pieceAt(leg_x, leg_y).color === Color.EMPTY) {
                        var p = this.pieceAt(nx, ny);
                        if (p.color !== color) {
                            moves.push(CnChess.xy2idx(nx, ny, this.width));
                        }
                    }
                }
            }
            return moves;
        };
        Game.prototype.rookCanMoves = function (x, y, color) {
            if (this.turn !== color) {
                return [];
            }
            var moves = [];
            var directions = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1],
            ];
            for (var i = 0; i < directions.length; i++) {
                var dx = directions[i][0];
                var dy = directions[i][1];
                var nx = x + dx;
                var ny = y + dy;
                while (this.isWithinBounds(nx, ny)) {
                    var p = this.pieceAt(nx, ny);
                    if (p.color === color) {
                        break;
                    }
                    moves.push(CnChess.xy2idx(nx, ny, this.width));
                    if (p.color !== Color.EMPTY) {
                        break;
                    }
                    nx += dx;
                    ny += dy;
                }
            }
            return moves;
        };
        Game.prototype.cannonCanMoves = function (x, y, color) {
            if (this.turn !== color) {
                return [];
            }
            var moves = [];
            var directions = [
                [0, -1],
                [0, 1],
                [-1, 0],
                [1, 0],
            ];
            for (var i = 0; i < directions.length; i++) {
                var dx = directions[i][0];
                var dy = directions[i][1];
                var nx = x + dx;
                var ny = y + dy;
                var jumped = false;
                while (this.isWithinBounds(nx, ny)) {
                    var p = this.pieceAt(nx, ny);
                    if (p.color === Color.EMPTY) {
                        if (!jumped) {
                            moves.push(CnChess.xy2idx(nx, ny, this.width));
                        }
                    }
                    else {
                        if (!jumped) {
                            jumped = true;
                        }
                        else {
                            if (p.color !== color) {
                                moves.push(CnChess.xy2idx(nx, ny, this.width));
                                break;
                            }
                        }
                    }
                    nx += dx;
                    ny += dy;
                }
            }
            return moves;
        };
        Game.prototype.pawnCanMoves = function (x, y, color) {
            var _a;
            if (this.turn !== color) {
                return [];
            }
            var moves = [];
            var directionsMap = (_a = {},
                _a[Color.RED] = [[0, -1]],
                _a[Color.BLACK] = [[0, 1]],
                _a[Color.EMPTY] = [[0, 0]],
                _a);
            //判断是否兵过河
            var isCrossRiver = color === Color.BLACK ? y >= 5 : y <= 4;
            if (isCrossRiver) {
                directionsMap[color].push([-1, 0], [1, 0]);
            }
            var directions = directionsMap[color];
            for (var i = 0; i < directions.length; i++) {
                var dr = directions[i];
                var dx = dr[0];
                var dy = dr[1];
                var nx = x + dx;
                var ny = y + dy;
                if (this.isWithinBounds(nx, ny)) {
                    var p = this.pieceAt(nx, ny);
                    if (p.color !== color) {
                        moves.push(CnChess.xy2idx(nx, ny, this.width));
                    }
                }
            }
            return moves;
        };
        Game.prototype.advisorCanMoves = function (x, y, color) {
            if (this.turn !== color) {
                return [];
            }
            var moves = [];
            var directions = [
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1],
            ];
            var palace_x = [3, 4, 5];
            var palace_y = Color.BLACK === color ? [0, 1, 2] : [7, 8, 9];
            for (var i = 0; i < directions.length; i++) {
                var dx = directions[i][0];
                var dy = directions[i][1];
                var nx = x + dx;
                var ny = y + dy;
                if (palace_x.includes(nx) && palace_y.includes(ny)) {
                    var p = this.pieceAt(nx, ny);
                    if (p.color !== color) {
                        moves.push(CnChess.xy2idx(nx, ny, this.width));
                    }
                }
            }
            return moves;
        };
        Game.prototype.getAllPiecesPositions = function (color) {
            var positions = [];
            for (var i = 0; i < this.board.length; i++) {
                if (this.board[i].color === color) {
                    positions.push(CnChess.idx2xy(i, this.width));
                }
            }
            return positions;
        };
        Game.prototype.getMoves = function (x, y) {
            if (!this.isWithinBounds(x, y)) {
                return [];
            }
            var p = this.pieceAt(x, y);
            if (p.color !== this.turn) {
                return [];
            }
            var type = p.type;
            switch (type) {
                case PieceType.KING:
                    return this.kingCanMoves(x, y, p.color);
                case PieceType.ADVISOR:
                    return this.advisorCanMoves(x, y, p.color);
                case PieceType.BISHOP:
                    return this.bishopCanMoves(x, y, p.color);
                case PieceType.KNIGHT:
                    return this.knightCanMoves(x, y, p.color);
                case PieceType.ROOK:
                    return this.rookCanMoves(x, y, p.color);
                case PieceType.CANNON:
                    return this.cannonCanMoves(x, y, p.color);
                case PieceType.PAWN:
                    return this.pawnCanMoves(x, y, p.color);
                default:
                    return [];
            }
        };
        Game.prototype.isKingInCheck = function (color) {
            var otherColor = this.otherColor(color);
            var kingPos = this.findKingPosition(color);
            if (this.isWithinBounds(kingPos[0], kingPos[1])) {
                var opponentPosArr = this.getAllPiecesPositions(otherColor);
                for (var i = 0; i < opponentPosArr.length; i++) {
                    var moves = this.getMoves(opponentPosArr[i][0], opponentPosArr[i][1]);
                    if (moves.includes(CnChess.xy2idx(kingPos[0], kingPos[1], this.width))) {
                        return true;
                    }
                }
            }
            return false;
        };
        Game.prototype.toFen = function () {
            var fen = "";
            for (var y = 0; y < this.height; y++) {
                var emptyCount = 0;
                for (var x = 0; x < this.width; x++) {
                    var p = this.board[CnChess.xy2idx(x, y, this.width)];
                    if (p.color === Color.EMPTY) {
                        emptyCount++;
                    }
                    else {
                        if (emptyCount > 0) {
                            fen += emptyCount.toString();
                            emptyCount = 0;
                        }
                        fen += CnChess.Piece2Fen(p);
                    }
                }
                if (emptyCount > 0) {
                    fen += emptyCount.toString();
                }
                if (y < this.height - 1) {
                    fen += "/";
                }
            }
            fen += this.turn === Color.RED ? " r" : " b"; // turn
            // fen += " - - 0 "+(1+this.history.length/2).toString();
            return fen;
        };
        //rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w
        Game.prototype.fromFen = function (fen) {
            this.width = CnChess.BOARD_WIDTH;
            this.height = CnChess.BOARD_HEIGHT;
            this.history = [];
            this.turn = Color.RED;
            var fenArr = fen.split(" ");
            var fenBoard = fenArr[0].split("/");
            var fenTurn = fenArr[1];
            if (fenTurn === "b") {
                this.turn = Color.BLACK;
            }
            else {
                this.turn = Color.RED;
            }
            this.board = new Array(CnChess.BOARD_SIZE).fill({
                color: Color.EMPTY,
                type: PieceType.EMPTY,
            });
            for (var y = 0; y < fenBoard.length; y++) {
                var pArr = fenBoard[y];
                var x = 0;
                for (var i = 0; i < pArr.length; i++) {
                    var p = pArr[i];
                    if (/^[0-9]$/.test(p)) {
                        x += parseInt(p);
                    }
                    else {
                        var piece = CnChess.Fen2Piece(p);
                        this.board[CnChess.xy2idx(x, y, this.width)] = piece;
                        x++;
                    }
                }
            }
        };
        Game.prototype.toString = function () {
            var result = "  ";
            for (var x = 0; x < this.width; x++) {
                result += x.toString() + " ";
            }
            result += "\n";
            for (var y = 0; y < this.height; y++) {
                result += y.toString() + " ";
                for (var x = 0; x < this.width; x++) {
                    var p = this.board[CnChess.xy2idx(x, y, this.width)];
                    result += CnChess.Piece2String(p);
                }
                result += (this.height - y - 1).toString() + " ";
                result += "\n";
            }
            // 添加行号
            result += "  ";
            for (var x = 0; x < this.width; x++) {
                result += String.fromCharCode("A".charCodeAt(0) + x) + " ";
            }
            result += "\n";
            result += "Turn: " + (this.turn === Color.RED ? "Red" : "Black") + "\n";
            result += "History: " + this.history.length + " steps\n";
            return result;
        };
        Game.prototype.makeMove = function (from, to) {
            var fromIdx = CnChess.xy2idx(from[0], from[1], this.width);
            var toIdx = CnChess.xy2idx(to[0], to[1], this.width);
            var mvs = this.getMoves(from[0], from[1]);
            if (mvs.indexOf(toIdx) !== -1) {
                var fromPiece = this.board[fromIdx];
                var toPiece = this.board[toIdx];
                this.board[fromIdx] = { color: Color.EMPTY, type: PieceType.EMPTY };
                this.board[toIdx] = fromPiece;
                this.history.push({
                    from: fromIdx,
                    to: toIdx,
                    turn: this.turn,
                    piece: fromPiece,
                    eatPiece: toPiece,
                });
                this.turn = this.turn === Color.RED ? Color.BLACK : Color.RED;
                return true;
            }
            return false;
        };
        Game.prototype.undoMove = function () {
            if (this.history.length === 0) {
                return false;
            }
            var move = this.history.pop();
            if (move) {
                this.board[move.from] = move.piece;
                this.board[move.to] = move.eatPiece;
                this.turn = this.turn === Color.RED ? Color.BLACK : Color.RED;
            }
            return true;
        };
        return Game;
    }());
    CnChess.Game = Game;
})(CnChess || (CnChess = {}));
exports.default = CnChess;
//# sourceMappingURL=CnChess.js.map