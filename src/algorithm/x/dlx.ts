namespace dlx {

    export class Node{
        left:Node
        right:Node
        up:Node
        down:Node
        column:Node
        row:number
        size:number
        name:string
        constructor(){
            this.left = this
            this.right = this
            this.up = this
            this.down = this
            this.column = this
            this.row = 0
            this.size = 0
        }
    }

    export class Dlx{
        head:Node
        columnNodes:Node[]
        answer:number[]
        constructor(data:number[][]){
            this.answer = []
            this.head = new Node
            this.head.name = "h"
            let lenX = data[0].length
            let lenY = data.length

            for(let i = 0 ; i < lenY ; i++){
                this.answer.push(-1)
            }
            this.columnNodes = []            
            for(let i = 0 ; i < lenX ; i++){
                this.columnNodes.push(new Node)
                this.columnNodes[i].left = i>0 ? this.columnNodes[i-1] : this.head
                this.columnNodes[i].left.right = this.columnNodes[i]
                this.columnNodes[i].name = "c"+i
            }

            this.columnNodes[lenX-1].right = this.head

            for(let i = 0; i < lenY ; i++){
                for(let j = 0 ; j < lenX ; j++){
                    if(data[i][j]!=0){
                        let row = i+1
                        let left = this.lastRowNode(row)
                        let right = this.firstRowNode(row)
                        let node = new Node
                        node.name = "c"+j+"-"+i
                        node.row = row
                        node.column = this.columnNodes[j]
                        this.columnNodes[j].size++
                        node.up = this.lastDownNode(j)
                        node.up.down = node
                        node.down = this.columnNodes[j]
                        this.columnNodes[j].up = node
                        
                        if(left!=null) {
                            node.left = left
                            node.left.right = node
                        }
                        if(right!=null){
                            node.right = right
                            node.right.left = node
                        }
                    }
                }
            }
        }

        lastDownNode(column:number):Node{
            let node = this.columnNodes[column]
            while(node.down!=this.columnNodes[column]) node = node.down
            return node
        }

        lastRowNode(row:number){
            let maxX = this.columnNodes.length
            for(let j = maxX - 1 ; j>=0 ; j --){
                let node = this.columnNodes[j]
                while(node.down!=this.columnNodes[j]){
                    node = node.down
                    if(node.row == row) return node
                    if(node.row > row) break
                }
            }
            return null
        }

        firstRowNode(row:number){
            let maxX = this.columnNodes.length
            for(let i = 0 ; i < maxX ; i++){
                let node = this.columnNodes[i]
                while(node.down!=this.columnNodes[i]){
                    node = node.down
                    if(node.row == row) return node
                    if(node.row > row) break
                }
            }
            return null
        }

        cover(node:Node){
            node.right.left = node.left
            node.left.right = node.right
            for(let i = node.down ; i!=node; i = i.down){
                //每一列
                for(let j = i.right ; j!=i ; j = j .right){
                    //每一行
                    j.down.up = j.up
                    j.up.down = j.down
                    j.column.size -- 
                }
            }
        }

        uncover(node:Node){
            for(let i = node.up ; i!=node; i = i.up){
                for(let j = i.left ; j!=i ; j = j .left){
                    j.down.up = j.up.down = j
                    j.column.size++ 
                }
            }
            node.right.left = node.left.right  = node
        }

        dancing(d:number){
            if(this.head.right == this.head) return true
            let col:Node = this.head.right

            for(let node = this.head.right; node!=this.head; node = node.right){
                if(node.size<col.size) col = node
            }
            if(col.size<1) return false
            this.cover(col)
            for(let node = col.down ; node!=col; node = node.down){
                this.answer[d] = node.row
                for(let nj = node.right ; nj!=node; nj = nj.right) this.cover(nj.column)
                if(this.dancing(d+1)) return true
                for(let nj = node.left ; nj!=node; nj = nj.left) this.uncover(nj.column)
            }
            this.uncover(col)
            return false
        }
    }

    export function solveStandardSudoku(subject:string,gong:number){
        let  getSquare = (n:number)=>{
            if(n%1!=0) return -1;
            let i = 1;
            for(; n>0; i+=2){
                n -= i;
            }
            if(n==0) {
                return  (i-1)/2;
            }
            return -1;
        }
        let getArr = (gongW:number, gongH:number , i:number, v:number, gong:number)=>{
            let x = i%gong;
            let y = Math.floor(i/gong);
            let arr = new Array(gong*gong*4).fill(0);
            let c1 = i;
            let c2 = gong*gong + x*gong + v-1;
            let c3 = gong*gong*2 + y*gong + v-1;
            let gongX = Math.floor(x/gongW);
            let gongY = Math.floor(y/gongH);
            let gongP = gongX + gongY *Math.floor(gong/gongW);
            let c4 = gong*gong*3 + gongP*gong + v-1;
            arr[c1] = 1;
            arr[c2] = 1;
            arr[c3] = 1;
            arr[c4] = 1;
            return arr;
        }
        let sq = getSquare(gong)
        let gongW = sq;
        let gongH = sq;
        //先固定几个

        if(gong==6){
            gongW = 3;
            gongH = 2;
        }
        
        if(subject.length!=gong*gong) return null;

        if(gongW == -1) return null;
        let sudoArr:number[][] = []
        let rowArr:number[][] = []
        for(let i = 0 ; i < gong*gong ; i++){
            let v = subject.charCodeAt(i) - '0'.charCodeAt(0);
            if(v==0){
                for(let j = 1 ; j <= gong ; j++){
                    sudoArr.push(getArr(gongW,gongH,i,j,gong));
                    rowArr.push([i,j]);
                }
            }else{
                sudoArr.push(getArr(gongW,gongH,i,v,gong));
                rowArr.push([i,v]);
            }
        }
        let dx = new Dlx(sudoArr);
        let result = dx.dancing(0);
        if(result){
            let ansA = new Array(gong*gong).fill(0)
            for(let i = 0 ; i< dx.answer.length ; i++){
                if(dx.answer[i]>0){
                    let a = rowArr[dx.answer[i]-1];
                    ansA[a[0]] = a[1]
                }
            }
           return  ansA.join("");
        }
        return null;
    }
}

export default dlx