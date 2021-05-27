export declare class SudoKu {
    sudoKuOrigin: string;
    solveSudoku: Array<Array<Array<number>>>;
    /**
     *
     * @param sudoKuOrigin 标准数独的题目字符串 9x9
     */
    constructor(sudoKuOrigin: string);
    print(): void;
    isSolved(): boolean;
    solve(): Array<Array<number>>;
    getSolved(): Array<Array<number>>;
    unique(x: number, y: number, p: number): void;
    /**
     * 检查x列y行的值是否有冲突
     * @param x
     * @param y
     */
    check(x: number, y: number): boolean;
}
