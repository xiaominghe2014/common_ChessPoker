
import * as Poker from '../model/Poker';
import * as common from '../utils/common';
import * as Algorithm from '../algorithm/Algorithm';
import { log } from '../utils/log';
import landlords from '../algorithm/landlords/landlordsAlgorithm';
import dlx from '../algorithm/x/dlx';

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

function test(): void {
    log("dfsQueen 8 is:{}",Algorithm.dfsQueen(8))
    log("AllN(3):{}",Algorithm.AllN(3))

    let ans = Algorithm.gaussSolutions([
        [1,0,5,8],
        [3,2,3,3],
        [-1,-3,5,7],
        [9,-5,3,6]
    ],[37,34,13,26])

    log("gaussSolutions:{}",ans)
    console.time("algorithm-x-9")
    let sudoStr9 = "004100000000030060105000020680001200002000300003400058040000601030020000000004700"
    log("answer 9 :{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudoStr9,9),3,9))
    console.timeEnd("algorithm-x-9")
    console.time("algorithm-x-6")
    let sudoStr6 = "015000000001030602602030400000000460";
    log("answer 6 :{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudoStr6,6),3,6))
    console.timeEnd("algorithm-x-6")
    console.time("algorithm-x-4")
    let sudoStr4 = "0000300000400230"
    log("answer 4 :{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudoStr4,4),2,4))
    console.timeEnd("algorithm-x-4")
}
test()



