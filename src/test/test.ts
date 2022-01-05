
import * as Poker from '../model/Poker';
import * as common from '../utils/common';
import * as Algorithm from '../algorithm/Algorithm';
import { log } from '../utils/log';
import landlords from '../algorithm/landlords/landlordsAlgorithm';
import dlx from '../algorithm/x/dlx';

function getArr(i:number,v:number,gong:number){
    let x = i%gong
    let y = Math.floor(i/gong)
    let gongW = Math.sqrt(gong)
    let gongH = Math.sqrt(gong)
    let arr = new Array(gong*gong*4).fill(0)
    let c1 = i 
    let c2 = gong*gong + x*gong + v-1
    let c3 = gong*gong*2 + y*gong + v-1
    let gongX = Math.floor(x/gongW)
    let gongY = Math.floor(y/gongH)
    let gongP = gongX + gongY * Math.sqrt(gong)
    let c4 = gong*gong*3 + gongP*gong + v-1
    arr[c1] = 1 
    arr[c2] = 1
    arr[c3] = 1
    arr[c4] = 1
    return arr
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
    console.time("algorithm-x")
    let sudoStr = "004100000000030060105000020680001200002000300003400058040000601030020000000004700"
    let gong = 9
    let sudoArr = []
    let rowArr = []
    for(let i = 0 ; i < gong*gong ; i++){
        let v = parseInt(sudoStr.charAt(i))
        if(v==0){
            for(let j = 1 ; j <= gong ; j++){
                sudoArr.push(getArr(i,j,gong))
                rowArr.push([i,j])
            }
        }else{
            sudoArr.push(getArr(i,v,gong))
            rowArr.push([i,v])
        }
        // testGongPos(i,gong)
    }

    //找出空列，删除
    let kongIdx:number[] = []
    for(let i = 0 ; i < sudoArr[0].length ; i++){
        let len = sudoArr.length
        let kong = true
        for(let j = 0 ; j < len ; j ++){
            if(sudoArr[j][i]!=0){
                kong = false
                break
            }
        }
        if(kong){
            kongIdx.push(i)
        }
    }
    let sudoArrNoBlank = []
    let len = sudoArr.length
    for(let j = 0 ; j < len ; j ++){
        let noBlank = []
        for (let i = 0 ; i < sudoArr[0].length ; i ++){
            if(kongIdx.indexOf(i)==-1){
                noBlank.push(sudoArr[j][i])
            }
        }
        sudoArrNoBlank.push(noBlank)
    }
    let dx = new dlx.Dlx(sudoArr)
    let success = dx.dancing(0)
    log("success:{}",success)
    let ansArr = []
    for(let i = 0 ; i< dx.answer.length ; i++){
        if(dx.answer[i]>0){
            ansArr.push(dx.answer[i])
        }
    }
    
    let ansA = new Array(gong*gong).fill(0)
    for(let i = 0 ; i < ansArr.length ; i++){
        let a = rowArr[ansArr[i]-1]
        ansA[a[0]] = a[1]
    }
    log("answer:{}",ansA.join(""))
    console.timeEnd("algorithm-x")
}

test()



