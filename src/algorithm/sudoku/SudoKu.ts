
export class SudoKu{

    matrix:Array<Array<number>> //9x9
    /**
     * 
     * @param sudoKuOrigin 标准数独的题目字符串 9x9
     */
    constructor(public sudoKuOrigin: string){
        if(sudoKuOrigin==void 0 || sudoKuOrigin==null || sudoKuOrigin.length != 81 || /^\d{81}$/.test(sudoKuOrigin) == false) {
            throw new Error("输入的字符串不合格:"+sudoKuOrigin)
        }
        this.init()
        this.outPut()
    }

    isValid(board:Array<Array<number>>, row:number, col:number, k:number):boolean {
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
              return false;
            }
        }
        return true;
    }

    sodokoSolver(board:Array<Array<number>>) {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
              for (let k = 1; k <= 9; k++) {
                if (this.isValid(board, i, j, k)) {
                    board[i][j] = k;
                if (this.sodokoSolver(board)) {
                    return true;
                } else {
                    board[i][j] = 0;
                }
               }
             }
             return false;
           }
         }
       }
       return true;
    }

    init(){
      this.matrix = []
      let arr = this.sudoKuOrigin.split("").map(v=>parseInt(v))
      for (let i = 0; i < 9; i++){
           let tmp = []
           for (let j = 0; j < 9 ; j ++){
                tmp.push(arr[i*9 + j])
           }
           this.matrix.push(tmp)
      }
    }

    outPut(){
        let des = "\n"
        for (let y = 0 ; y < 9 ; y ++){
            for (let x = 0 ; x < 9 ; x ++){
                let n = this.matrix[y][x]
                des += `${n} `                
            }
            des += "\n"
        }
        console.log(des)
    }

    solve():Array<Array<number>>{
        this.sodokoSolver(this.matrix)
        // this.outPut()
        return this.matrix
    }
}