declare namespace CnChess {
    const BOARD_WIDTH: number;
    const BOARD_HEIGHT: number;
    const BOARD_SIZE: number;
    const xy2idx: (x: number, y: number, width: number) => number;
    const idx2xy: (idx: number, width: number) => [number, number];
    enum Color {
        EMPTY = 0,
        RED = 1,
        BLACK = 2
    }
    enum PieceType {
        EMPTY = 0,
        KING = 1,
        ADVISOR = 2,
        BISHOP = 3,
        KNIGHT = 4,
        ROOK = 5,
        CANNON = 6,
        PAWN = 7
    }
    interface Piece {
        color: Color;
        type: PieceType;
    }
    const Piece2Fen: (piece: Piece) => string;
    const Fen2Piece: (fen: string) => Piece;
    const Piece2String: (piece: Piece) => string;
    enum GameResult {
        RED_WIN = 1,
        DRAW = 0,
        BLACK_WIN = -1
    }
    interface Move {
        from: number;
        to: number;
        eatPiece: Piece;
        turn: Color;
        piece: Piece;
    }
    class Game {
        width: number;
        height: number;
        board: Piece[];
        turn: Color;
        history: Move[];
        constructor(fen?: string);
        isWithinBounds(x: number, y: number): boolean;
        pieceAt(x: number, y: number): Piece;
        setPieceAt(x: number, y: number, piece: Piece): void;
        otherColor(color: Color): Color;
        findKingPosition(color: Color): number[];
        kingCanMoves(x: number, y: number, color: Color): number[];
        bishopCanMoves(x: number, y: number, color: Color): number[];
        knightCanMoves(x: number, y: number, color: Color): number[];
        rookCanMoves(x: number, y: number, color: Color): number[];
        cannonCanMoves(x: number, y: number, color: Color): number[];
        pawnCanMoves(x: number, y: number, color: Color): number[];
        advisorCanMoves(x: number, y: number, color: Color): number[];
        getAllPiecesPositions(color: Color): [number, number][];
        getMoves(x: number, y: number): number[];
        isKingInCheck(color: Color): boolean;
        toFen(): string;
        fromFen(fen: string): void;
        toString(): string;
        makeMove(from: [number, number], to: [number, number]): boolean;
        undoMove(): boolean;
    }
}
export default CnChess;
