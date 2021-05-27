
export class SudoKu{

    solveSudoku:Array<Array<Array<number>>>
    /**
     * 
     * @param sudoKuOrigin 标准数独的题目字符串 9x9
     */
    constructor(public sudoKuOrigin: string){
        this.solveSudoku = []
        let arr = sudoKuOrigin.split("").map(v=>parseInt(v))
        for(let i = 0; i < 9 ; i ++){
            let tmp = []
            for(let j = 0; j <9 ; j ++){
                let origin = arr[i*9 + j] //i 行 j列
                if(origin != 0){
                    tmp.push([origin])
                }else{
                    //考虑行列以及九宫格中的约束
                    let possible = [1,2,3,4,5,6,7,8,9]
                    //行 row
                    for(let r = 0 ; r < 9 ; r ++){
                        if(r != j){
                            possible = possible.filter(v=>v!=arr[i*9 + r])
                        }
                    }
                    //列 column
                    for(let c = 0 ; c < 9 ; c ++){
                        if(c != i){
                            possible = possible.filter(v=>v!=arr[c*9 + j])
                        }
                    }
                    // 九宫格
                    //九宫格的坐标
                    let x = j%3, y=i%3
                    for(let h = 0 ; h < 3 ; h ++){
                        for (let l = 0 ; l < 3 ; l ++){
                            if(h==x&&l==y) continue
                            let idx = i*9+j + h - x + (l-y)*9
                            let p = arr[idx]
                            possible = possible.filter(v=>v!=p)
                        }
                    }
                    tmp.push(possible)
                } 
            }
            this.solveSudoku.push(tmp)
        }
    }

    print() {
        let des = "\n"
        for (let y = 0 ; y < 9 ; y ++){
            for (let x = 0 ; x < 9 ; x ++){
                let arr = this.solveSudoku[y][x]
                let str = ""
                for (let i = 0 ; i < arr.length ; i ++){
                    str += arr[i]
                }
                des += `${str} `                
            }
            des += "\n"
        }
        console.log(des)
    }

    isSolved(){
        for (let y = 0 ; y < 9 ; y ++){
            for (let x = 0 ; x < 9 ; x ++){
                if(this.solveSudoku[x][y].length > 1) return false                
            }
        }
        return true
    }

    solve():Array<Array<number>>{
        for (let y = 0 ; y < 9 ; y ++){
            for (let x = 0 ; x < 9 ; x ++){
                //过滤 x,y坐标的值是否冲突
                this.check(x,y)
                if(this.isSolved()) return this.getSolved()
            }
        }
        return this.solve()
    }

    getSolved():Array<Array<number>>{
        let r = []
        for (let i = 0 ; i < 9 ; i ++){
            let tmp = []
            for (let j = 0 ; j < 9 ; j++){
                tmp.push(this.solveSudoku[i][j][0])
            }
            r.push(tmp)
        }
        return r
    }

    unique(x:number, y:number,p:number) {
        //去除同行同列的可能性
        //行 row
        for(let r = 0 ; r < 9 ; r ++){
            if(r != x){
                if(this.solveSudoku[y][r].length>1) this.solveSudoku[y][r] = this.solveSudoku[y][r].filter(v=>v!=p)
            }
        }
        //列
        for(let l = 0 ; l < 9 ; l ++){
            if(l != y){
                if(this.solveSudoku[l][x].length > 1) this.solveSudoku[l][x] = this.solveSudoku[l][x].filter(v=>v!=p)
            }
        }
    }

    /**
     * 检查x列y行的值是否有冲突
     * @param x 
     * @param y 
     */
    check(x:number,y:number){
        let possible = this.solveSudoku[y][x]
        if(possible.length == 1){
            let p = possible[0]
            this.unique(x,y,p)
            return true
        } 
        //行 row
        for(let r = 0 ; r < 9 ; r ++){
            if(r != x){
                let p = this.solveSudoku[y][r]
                if(p.length == 1) possible = possible.filter(v=>v!=p[0])
            }
        }
        //列
        for(let l = 0 ; l < 9 ; l ++){
            if(l != y){
                let p = this.solveSudoku[l][x]
                if(p.length == 1) possible = possible.filter(v=>v!=p[0])
            }
        }
        //九宫
        //九宫格的坐标
        let xx = x%3, yy=y%3
        for(let h = 0 ; h < 3 ; h ++){
            for (let l = 0 ; l < 3 ; l ++){
                if(h!=xx&&yy!=l){
                    let p = this.solveSudoku[y+(l-yy)][x + (h-xx)]
                    if(p.length == 1) possible = possible.filter(v=>v!=p[0])
                }
            }
        }
        //确定九宫之内是否只有自己有可能
        if(possible.length>1){
            for(let m = 0 ; m < possible.length ; m ++){
                let pp = true
                let target = possible[m]
                for(let h = 0 ; h < 3 ; h ++){
                    for (let l = 0 ; l < 3 ; l ++){
                        if(h == xx && yy == l) continue
                        let p = this.solveSudoku[y+(l-yy)][x + (h-xx)]
                        if(p.indexOf(target)!=-1){
                            pp = false
                            //跳出循环
                            h = l = 3
                        } 
                    }
                }
                if(pp){
                    this.solveSudoku[y][x] = [possible[m]]
                    return true
                }
            }
        }
        this.solveSudoku[y][x] = possible
        if(possible.length == 1){
            let p = possible[0]
            this.unique(x,y,p)
        } 
        return possible.length == 1
    }
}