declare namespace go {
    const EMPTY = 0;
    const BLACK = 1;
    const WHITE = 2;
    interface CaptureNeighbors {
        liberty: number;
        neighbors: Array<number>;
    }
    interface MoveResult {
        result: boolean;
        info: Array<number>;
    }
    interface GoMove {
        color: number;
        pos: number;
        result?: MoveResult;
    }
    class Board {
        private width;
        private height;
        private board;
        private capture;
        private turn;
        private moveHistory;
        private AB;
        private AW;
        private originBoard;
        constructor(board: Array<number>, width: number);
        posColor(col: number, row: number): number;
        undo(): boolean;
        stepColAndRow(step: number): {
            col: number;
            row: number;
        } | null;
        setABAW(): void;
        clearBoard(): void;
        makeMoveByColAndRow(col: number, row: number): boolean;
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
        makeMove(mv: GoMove | null): boolean;
        otherColor(): number;
        private changeTurn;
        private searchInfo;
        tryMove(mv: GoMove): MoveResult | null;
        searchNeighbors(cNeighbors: CaptureNeighbors, board: Array<number>, searchPos: number, color: number, searchList: Array<number> | null): void;
        private boardStr;
        showBoard(): string;
        play(coord: string): boolean;
        pass(): void;
        lastPassCnt(): number;
        getMvList(): Array<GoMove>;
        isEye(pos: number, color: number, maxArea: number): boolean;
        private searchEye;
        getLastSgfMv(): string | null;
        getSgfMv(idx: number): string | null;
        private pos2Sgf;
        getLastGTPMv(): string;
        totalStep(): number;
        sgf(): string;
    }
}
export default go;
