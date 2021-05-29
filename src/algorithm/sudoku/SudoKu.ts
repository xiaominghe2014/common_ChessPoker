
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
        //1.行/列/九宫相异性
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
                    let x = j%3, y=i%3
                    for(let h = 0 ; h < 3 ; h ++){
                        for (let l = 0 ; l < 3 ; l ++){
                            if(h==x&&l==y) continue
                            let p = this.matrix[3*Math.floor(i/3)+h][3*Math.floor(j/3)+l]
                            possible = possible.filter(v=>v!=p)
                        }
                    }
                    tmp.push(possible)
                }                
            }
            this.matrixPossible.push(tmp)
        }
        //2.行/列/九宫唯一性
        for(let i=0 ;i < 9 ; i++){
            for(let j = 0 ; j < 9 ; j++){
                let possible = this.matrixPossible[i][j]
                if(possible.length>1){
                    for(let k = 0 ; k < possible.length ; k ++){
                        let v = possible[k]
                        let notOnlyRow = this.matrixPossible[i].some((r,idx)=>idx!=j&&r.indexOf(v)!=-1)
                        if(!notOnlyRow){
                            this.matrixPossible[i][j] = [v]
                            break
                        }

                        let notOnlyCol = this.matrixPossible.some((r,idx)=>idx!=i&&r[j].indexOf(v)!=-1)
                        if(!notOnlyCol){
                            this.matrixPossible[i][j] = [v]
                            break
                        }
                        let notOnlyBox = false
                        let x = j%3, y=i%3
                        for(let h = 0 ; h < 3 ; h ++){
                            for (let l = 0 ; l < 3 ; l ++){
                                if(h==x&&l==y) continue
                                let p = this.matrixPossible[3*Math.floor(i/3)+h][3*Math.floor(j/3)+l]
                                if(p.indexOf(v)!=-1){
                                    notOnlyBox = true
                                    h = l = 3
                                }
                            }
                        }
                        if(!notOnlyBox){
                            this.matrixPossible[i][j] = [v]
                            break
                        }
                    }
                }
            }
        }
        //3.行/列/九宫互斥性
        //22
        for(let i = 0 ; i < 9 ; i ++){
            let res = this.getRowPossibleByLength(i,2)
            if(res.length>1){
                //找出两个相同的数组
                for(let j = 0 ; j < res.length ; j ++){
                    for(let k = 0 ; k < res.length ; k ++){
                        if(j!=k){
                            if(this.arrayContain(res[j].v,res[k].v)){
                                this.removePossibleAtRow(i,res[j].v,[res[j].i,res[k].i])
                            }
                        }
                    }
                }
            }
        }
        for(let i = 0 ; i < 9 ; i ++){
            let res = this.getColPossibleByLength(i,2)
            if(res.length>1){
                //找出两个相同的数组
                for(let j = 0 ; j < res.length ; j ++){
                    for(let k = 0 ; k < res.length ; k ++){
                        if(j!=k){
                            if(this.arrayContain(res[j].v,res[k].v)){
                                this.removePossibleAtRow(i,res[j].v,[res[j].i,res[k].i])
                            }
                        }
                    }
                }
            }
        }
    }

    removePossibleAtRow(row:number,p:Array<number>,excludeCol:Array<number>){
        let r = this.matrixPossible[row]
        for(let i = 0 ; i < 9 ; i++){
            if(excludeCol.indexOf(i)!=-1) continue
            let cp = r[i]
            for(let j = 0 ; j < p.length ; j ++){
                let idx = cp.indexOf(p[j])
                if(idx!=-1){
                    this.matrixPossible[row][i].splice(idx,1)
                }
            }
        }
    }

    removePossibleAtCol(col:number,p:Array<number>,excludeRow:Array<number>){
        let r = this.matrixPossible.map((c)=>c[col])
        for(let i = 0 ; i < 9 ; i++){
            if(excludeRow.indexOf(i)!=-1) continue
            let cp = r[i]
            for(let j = 0 ; j < p.length ; j ++){
                let idx = cp.indexOf(p[j])
                if(idx!=-1){
                    this.matrixPossible[i][col].splice(idx,1)
                }
            }
        }
    }

    /**
     * 检测数组包含关系
     * @param arrA 
     * @param arrB 
     * @return {1|0|-1} 1 means A contains B, -1 means B contains A, other 0
     */
    arrayContain(arrA:Array<number>,arrB:Array<number>):1|0|-1{
        let lenA = arrA.length
        let lenB = arrB.length
        if(lenA>=lenB){
            for(let i = 0 ; i < lenB ; i++){
                let v = arrB[i]
                if(arrA.indexOf(v)==-1) return 0
            }
            return 1
        }else{
            for(let i = 0 ; i < lenA ; i++){
                let v = arrA[i]
                if(arrB.indexOf(v)==-1) return 0
            }
            return -1
        }
    }


    getRowPossibleByLength(row:number,len:number){
        return this.getPossibleByLength(row,len,-1)
    }

    getColPossibleByLength(col:number,len:number){
        return this.getPossibleByLength(col,len,1)
    }

    /**
     * 
     * @param idx 号码
     * @param len 
     * @param type -1 行 1 列 0 九宫格
     */
    getPossibleByLength(idx:number,len:number,type:number){
        let res:Array<{i:number,v:Array<number>}> = []
        if(-1==type){
            this.matrixPossible[idx].forEach((v,id)=>{
                if(v.length == len){
                    res.push({i:id,v:v})
                }
            })
        }else if(1==type){
            this.matrixPossible.map((col)=>col[idx]).forEach((v,id)=>{
                if(v.length == len){
                    res.push({i:id,v:v})
                }
            })
        }
        return res
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

    sudokuSolver(board:Array<Array<number>>) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] == 0) {
                    for (let k = 1; k <= 9; k++) {
                        if (this.isValid(board, i, j, k)) {
                            board[i][j] = k;
                        if (this.sudokuSolver(board)) {
                            // this.updatePossible()
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
        this.sudokuSolver(this.matrix)
        this.outPut()
        return this.matrix
    }
}