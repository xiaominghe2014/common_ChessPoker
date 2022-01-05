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

}

export default dlx