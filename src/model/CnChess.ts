namespace CnChess {
  export const BOARD_WIDTH: number = 9;
  export const BOARD_HEIGHT: number = 10;
  export const BOARD_SIZE: number = BOARD_WIDTH * BOARD_HEIGHT;

  export const xy2idx = (x: number, y: number, width: number): number => {
    return y * width + x;
  };

  export const idx2xy = (idx: number, width: number): [number, number] => {
    return [idx % width, Math.floor(idx / width)];
  };

  export enum Color {
    EMPTY = 0,
    RED = 1,
    BLACK = 2,
  }

  export enum PieceType {
    EMPTY = 0,
    KING = 1,
    ADVISOR = 2,
    BISHOP = 3,
    KNIGHT = 4,
    ROOK = 5,
    CANNON = 6,
    PAWN = 7,
  }

  export interface Piece {
    color: Color;
    type: PieceType;
  }

  export const Piece2Fen = (piece: Piece) => {
    if (piece.type === PieceType.EMPTY) {
      return "";
    }
    const pieceArr = ["K", "A", "B", "N", "R", "C", "P"];
    if (piece.color === Color.RED) {
      return pieceArr[piece.type - 1].toUpperCase();
    } else {
      return pieceArr[piece.type - 1].toLowerCase();
    }
  };

  export const Fen2Piece = (fen: string): Piece => {
    if (fen === "") {
      return { color: Color.EMPTY, type: PieceType.EMPTY };
    }
    const pieceArr = ["K", "A", "B", "N", "R", "C", "P"];
    const color = fen === fen.toUpperCase() ? Color.RED : Color.BLACK;
    const type = pieceArr.indexOf(fen.toUpperCase()) + 1;
    return { color, type };
  };

  export const Piece2String = (piece: Piece): string => {
    if (piece.type === PieceType.EMPTY) {
      return "  ";
    }
    const pieceArrBlack = ["將", "士", "象", "馬", "車", "砲", "卒"];
    const pieceArrRed = ["帅", "仕", "相", "傌", "俥", "炮", "兵"];
    if (piece.color === Color.RED) {
      return pieceArrRed[piece.type - 1];
    } else {
      return pieceArrBlack[piece.type - 1];
    }
  };

  export enum GameResult {
    RED_WIN = 1,
    DRAW = 0,
    BLACK_WIN = -1,
  }

  export interface Move {
    from: number;
    to: number;
    eatPiece: Piece;
    //   check: boolean,
    turn: Color;
    piece: Piece;
  }

  const DEFAULT_FEN =
    "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";

  export class Game {
    public width: number;
    public height: number;
    public board: Piece[]; // [0, 0] is top left, [8, 9] is bottom right
    public turn: Color;
    public history: Move[];

    constructor(fen: string = DEFAULT_FEN) {
      this.fromFen(fen);
    }

    isWithinBounds(x: number, y: number) {
      return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    pieceAt(x: number, y: number): Piece {
      return this.board[x + y * this.width];
    }

    setPieceAt(x: number, y: number, piece: Piece) {
      this.board[x + y * this.width] = piece;
    }

    otherColor(color: Color): Color {
      return color === Color.BLACK ? Color.RED : Color.BLACK;
    }

    findKingPosition(color: Color): number[] {
      for (let i = 0; i < this.board.length; i++) {
        if (
          this.board[i].type === PieceType.KING &&
          this.board[i].color === color
        ) {
          return idx2xy(i, this.width);
        }
      }
      return [-1, -1];
    }

    public kingCanMoves(x: number, y: number, color: Color): number[] {
      if (this.turn !== color) {
        return [];
      }
      let moves = [];
      let palace_x = [3, 4, 5];
      let palace_y = Color.BLACK === color ? [0, 1, 2] : [7, 8, 9];
      let directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]; // up, down, right, left
      let otherColor = this.otherColor(color);
      let kingPos = this.findKingPosition(otherColor);
      for (let i = 0; i < directions.length; i++) {
        let dx = directions[i][0];
        let dy = directions[i][1];
        let nx = x + dx;
        let ny = y + dy;
        if (palace_x.includes(nx) && palace_y.includes(ny)) {
          let p = this.pieceAt(nx, ny);
          if (p.color !== color) {
            if (p.color === Color.EMPTY) {
              // 考虑白脸将
              let hasPiece = false;
              if (nx == kingPos[0]) {
                let min_y = Math.min(ny, kingPos[1]);
                let max_y = Math.max(ny, kingPos[1]);
                for (let j = min_y + 1; j < max_y; j++) {
                  if (this.pieceAt(nx, j).color !== Color.EMPTY) {
                    hasPiece = true;
                    break;
                  }
                }
                if (hasPiece) {
                  moves.push(xy2idx(nx, ny, this.width));
                }
              }
            } else {
              moves.push(xy2idx(nx, ny, this.width));
            }
          }
        }
      }
      return moves;
    }

    public bishopCanMoves(x: number, y: number, color: Color): number[] {
      if (this.turn !== color) {
        return [];
      }
      let moves = [];
      let riverX = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      let riverY = color === Color.BLACK ? [0, 1, 2, 3, 4] : [5, 6, 7, 8, 9];
      let directions = [
        [-2, -2],
        [2, 2],
        [-2, 2],
        [2, -2],
      ]; // 左上，右上，左下，右下
      for (let i = 0; i < directions.length; i++) {
        let dx = directions[i][0];
        let dy = directions[i][1];
        let nx = x + dx;
        let ny = y + dy;
        if (riverX.includes(nx) && riverY.includes(ny)) {
          // 考虑卡象眼的情况
          let eye_x = x + dx / 2;
          let eye_y = y + dy / 2;
          if (this.pieceAt(eye_x, eye_y).color === Color.EMPTY) {
            moves.push(xy2idx(nx, ny, this.width));
          }
        }
      }
      return moves;
    }

    public knightCanMoves(x: number, y: number, color: Color): number[] {
      if (this.turn !== color) {
        return [];
      }
      let moves = [];
      let directions = [
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [-2, -1],
        [-2, 1],
        [2, -1],
        [2, 1],
      ];
      let directionLegs = [
        [0, -1],
        [0, 1],
        [0, -1],
        [0, 1],
        [-1, 0],
        [-1, 0],
        [1, 0],
        [1, 0],
      ];
      for (let i = 0; i < directions.length; i++) {
        let dx = directions[i][0];
        let dy = directions[i][1];
        let nx = x + dx;
        let ny = y + dy;
        if (this.isWithinBounds(nx, ny)) {
          let leg_x = x + directionLegs[i][0];
          let leg_y = y + directionLegs[i][1];
          if (this.pieceAt(leg_x, leg_y).color === Color.EMPTY) {
            let p = this.pieceAt(nx, ny);
            if (p.color !== color) {
              moves.push(xy2idx(nx, ny, this.width));
            }
          }
        }
      }
      return moves;
    }

    public rookCanMoves(x: number, y: number, color: Color): number[] {
      if (this.turn !== color) {
        return [];
      }
      let moves = [];
      let directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (let i = 0; i < directions.length; i++) {
        let dx = directions[i][0];
        let dy = directions[i][1];
        let nx = x + dx;
        let ny = y + dy;
        while (this.isWithinBounds(nx, ny)) {
          let p = this.pieceAt(nx, ny);
          if (p.color === color) {
            break;
          }
          moves.push(xy2idx(nx, ny, this.width));
          if (p.color !== Color.EMPTY) {
            break;
          }
          nx += dx;
          ny += dy;
        }
      }
      return moves;
    }

    public cannonCanMoves(x: number, y: number, color: Color): number[] {
      if (this.turn !== color) {
        return [];
      }
      let moves = [];
      let directions = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
      ];
      for (let i = 0; i < directions.length; i++) {
        let dx = directions[i][0];
        let dy = directions[i][1];
        let nx = x + dx;
        let ny = y + dy;
        let jumped = false;
        while (this.isWithinBounds(nx, ny)) {
          let p = this.pieceAt(nx, ny);
          if (p.color === Color.EMPTY) {
            if (!jumped) {
              moves.push(xy2idx(nx, ny, this.width));
            }
          } else {
            if (!jumped) {
              jumped = true;
            } else {
              if (p.color !== color) {
                moves.push(xy2idx(nx, ny, this.width));
                break;
              }
            }
          }
          nx += dx;
          ny += dy;
        }
      }
      return moves;
    }

    public pawnCanMoves(x: number, y: number, color: Color): number[] {
      if (this.turn !== color) {
        return [];
      }
      let moves = [];
      let directionsMap: { [key in Color]: [[number, number]] } = {
        [Color.RED]: [[0, -1]],
        [Color.BLACK]: [[0, 1]],
        [Color.EMPTY]: [[0, 0]],
      };
      //判断是否兵过河

      let isCrossRiver = color === Color.BLACK ? y >= 5 : y <= 4;
      if (isCrossRiver) {
        directionsMap[color].push([-1, 0], [1, 0]);
      }
      let directions = directionsMap[color];
      for (let i = 0; i < directions.length; i++) {
        let dr = directions[i];
        let dx = dr[0];
        let dy = dr[1];
        let nx = x + dx;
        let ny = y + dy;
        if (this.isWithinBounds(nx, ny)) {
          let p = this.pieceAt(nx, ny);
          if (p.color !== color) {
            moves.push(xy2idx(nx, ny, this.width));
          }
        }
      }
      return moves;
    }

    public advisorCanMoves(x: number, y: number, color: Color): number[] {
      if (this.turn !== color) {
        return [];
      }
      let moves = [];
      let directions = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];
      let palace_x = [3, 4, 5];
      let palace_y = Color.BLACK === color ? [0, 1, 2] : [7, 8, 9];
      for (let i = 0; i < directions.length; i++) {
        let dx = directions[i][0];
        let dy = directions[i][1];
        let nx = x + dx;
        let ny = y + dy;
        if (palace_x.includes(nx) && palace_y.includes(ny)) {
          let p = this.pieceAt(nx, ny);
          if (p.color !== color) {
            moves.push(xy2idx(nx, ny, this.width));
          }
        }
      }
      return moves;
    }

    public getAllPiecesPositions(color: Color): [number, number][] {
      let positions: [number, number][] = [];
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[i].color === color) {
          positions.push(idx2xy(i, this.width));
        }
      }
      return positions;
    }

    public getMoves(x: number, y: number): number[] {
      if (!this.isWithinBounds(x, y)) {
        return [];
      }
      let p = this.pieceAt(x, y);
      if (p.color !== this.turn) {
        return [];
      }
      let type = p.type;
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
    }

    public isKingInCheck(color: Color): boolean {
      let otherColor = this.otherColor(color);
      let kingPos = this.findKingPosition(color);
      if (this.isWithinBounds(kingPos[0], kingPos[1])) {
        let opponentPosArr = this.getAllPiecesPositions(otherColor);
        for (let i = 0; i < opponentPosArr.length; i++) {
          let moves = this.getMoves(opponentPosArr[i][0], opponentPosArr[i][1]);
          if (moves.includes(xy2idx(kingPos[0], kingPos[1], this.width))) {
            return true;
          }
        }
      }
      return false;
    }

    public toFen(): string {
      let fen = "";
      for (let y = 0; y < this.height; y++) {
        let emptyCount = 0;
        for (let x = 0; x < this.width; x++) {
          let p = this.board[xy2idx(x, y, this.width)];
          if (p.color === Color.EMPTY) {
            emptyCount++;
          } else {
            if (emptyCount > 0) {
              fen += emptyCount.toString();
              emptyCount = 0;
            }
            fen += Piece2Fen(p);
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
    }
    //rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w
    public fromFen(fen: string): void {
      this.width = BOARD_WIDTH;
      this.height = BOARD_HEIGHT;
      this.history = [];
      this.turn = Color.RED;
      let fenArr = fen.split(" ");
      let fenBoard = fenArr[0].split("/");
      let fenTurn = fenArr[1];
      if (fenTurn === "b") {
        this.turn = Color.BLACK;
      } else {
        this.turn = Color.RED;
      }
      this.board = new Array(BOARD_SIZE).fill({
        color: Color.EMPTY,
        type: PieceType.EMPTY,
      });
      for (let y = 0; y < fenBoard.length; y++) {
        let pArr = fenBoard[y];
        let x = 0;
        for (let i = 0; i < pArr.length; i++) {
          let p = pArr[i];
          if (/^[0-9]$/.test(p)) {
            x += parseInt(p);
          } else {
            let piece = Fen2Piece(p);
            this.board[xy2idx(x, y, this.width)] = piece;
            x++;
          }
        }
      }
    }

    public toString(): string {
      let result: string = "  ";
      for (let x = 0; x < this.width; x++) {
        result += x.toString() + " ";
      }
      result += "\n";
      for (let y = 0; y < this.height; y++) {
        result += y.toString() + " ";
        for (let x = 0; x < this.width; x++) {
          let p = this.board[xy2idx(x, y, this.width)];
          result += Piece2String(p);
        }
        result += (this.height - y - 1).toString() + " ";
        result += "\n";
      }
      // 添加行号
      result += "  ";
      for (let x = 0; x < this.width; x++) {
        result += String.fromCharCode("A".charCodeAt(0) + x) + " ";
      }
      result += "\n";
      result += "Turn: " + (this.turn === Color.RED ? "Red" : "Black") + "\n";
      result += "History: " + this.history.length + " steps\n";
      return result;
    }

    public makeMove(from: [number, number], to: [number, number]): boolean {
      let fromIdx = xy2idx(from[0], from[1], this.width);
      let toIdx = xy2idx(to[0], to[1], this.width);
      let mvs = this.getMoves(from[0], from[1]);
      if(mvs.indexOf(toIdx) !== -1) {
        let fromPiece = this.board[fromIdx];
        let toPiece = this.board[toIdx];
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
    }

    public undoMove(): boolean {
      if (this.history.length === 0) {
        return false;
      }
      let move = this.history.pop();
      if (move) {
        this.board[move.from] = move.piece;
        this.board[move.to] = move.eatPiece;
        this.turn = this.turn === Color.RED ? Color.BLACK : Color.RED;
      }
      return true;
    }
  }
}

export default CnChess;