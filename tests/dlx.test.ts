import { log } from '../src/utils/log';
import dlx from '../src/algorithm/x/dlx';


function transitionStr2Matrix(str: string|null,gongW:number,gong:number){

    if(str==null || str.length!=gong*gong) return str
    let r = ""
    for(let i = 0 ; i < str.length ; i++){
        if(i%gong==0){
            r += "\n"
        }else if(i%gongW == 0){
            r += " "
        }
        r+=str[i]
    }
    return r
}


for(let i = 2 ; i< 10 ; i++){
    let wh = dlx.getWH(i)
    let tag = `algorithm-x-${{i}}`
    console.time(tag)
    let sudo = new Array(i*i).fill(0).map((_,idx)=>idx>i-1?0:idx+1).join('')
    log("{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudo,i),wh[0],i))
    console.timeEnd(tag)
}