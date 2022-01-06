declare namespace dlx {
    class Node {
        left: Node;
        right: Node;
        up: Node;
        down: Node;
        column: Node;
        row: number;
        size: number;
        name: string;
        constructor();
    }
    class Dlx {
        head: Node;
        columnNodes: Node[];
        answer: number[];
        constructor(data: number[][]);
        lastDownNode(column: number): Node;
        lastRowNode(row: number): Node | null;
        firstRowNode(row: number): Node | null;
        cover(node: Node): void;
        uncover(node: Node): void;
        dancing(d: number): boolean;
    }
    function solveStandardSudoku(subject: string, gong: number): string | null;
}
export default dlx;
