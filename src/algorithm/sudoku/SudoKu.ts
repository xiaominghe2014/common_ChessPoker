
export class SudoKu{

    matrix:Array<Array<number>> //9x9
    matrixPossible:Array<Array<Array<number>>> //可能
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
        this.updatePossible()
    }

    updatePossible(){
        this.matrixPossible = []
        for(let i = 0; i < 9 ; i ++){
            let tmp = []
            for (let j = 0 ; j < 9 ; j ++){
                let e = this.matrix[i][j]
                if(e != 0) tmp.push([e])
                else{
                    //约束条件
                    let possible = [1,2,3,4,5,6,7,8,9]
                    //行列
                    possible = possible.filter(_=>this.matrix[i].indexOf(_)==-1)
                    possible = possible.filter(_=>!this.matrix.some(r=>r[j]==_))
                    //九宫
                    for (let k = 0; k < 9; k++){
                        const m = 3 * Math.floor(i / 3) + Math.floor(i / 3);
                        const n = 3 * Math.floor(j / 3) + j % 3;
                        possible = possible.filter(v=>v!=this.matrix[m][n])
                    }
                    tmp.push(possible)
                }                
            }
            this.matrixPossible.push(tmp)
        }
    }

    isValid(board:Array<Array<number>>, row:number, col:number, k:number):boolean {
        let p = this.matrixPossible[row][col]
        if(p.indexOf(k)==-1){
            // console.log(row,col,k)
            return false
        } 
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
                            this.updatePossible()
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
        this.outPut()
        return this.matrix
    }
}