
import * as Poker from '../model/Poker';
import * as common from '../utils/common';
import * as Algorithm from '../algorithm/Algorithm';
import { log } from '../utils/log';
import landlords from '../algorithm/landlords/landlordsAlgorithm';
import dlx from '../algorithm/x/dlx';
import swissSys from '../algorithm/swissSys/SwissSys';

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

function desRotation(r:swissSys.CompetitionRotation){
    let round = r.round
    let againsts = r.againsts;
    let str = "";
    for(let against of againsts){
        str += `(${against.first.serialNumber}=`
        if(against.bye){
            str += `bye`;
        }else{
            str += `${against.second.serialNumber}`;
        }
        str +="),";
    }
    console.log( "[round:"+round+"]"+str);
}

function test(): void {

    // for(let i=1; i<100 ; i ++){
    //     let wh = dlx.getWH(i)
    //     console.log(i,wh[0],wh[1])
    // }
    let r1 = swissSys.layoutFirst(9);
    desRotation(r1);
    r1.againsts[1].first.scores+=1;
    let r2 = swissSys.layoutNext([r1]);
    r2.againsts[2].first.scores+=1;
    desRotation(r2);
    let r3 = swissSys.layoutNext([r1,r2]);
    r3.againsts[3].first.scores+=1;
    desRotation(r3);
    let r4 = swissSys.layoutNext([r1,r2,r3]);
    desRotation(r4);
    log("dfsQueen 8 is:{}",Algorithm.dfsQueen(8))
    log("AllN(3):{}",Algorithm.AllN(3))

    let ans = Algorithm.gaussSolutions([
        [1,0,5,8],
        [3,2,3,3],
        [-1,-3,5,7],
        [9,-5,3,6]
    ],[37,34,13,26])

    // log("gaussSolutions:{}",ans)
    // console.time("algorithm-x-9")
    // let sudoStr9 = "500002000400708001083000900000000390040070010065000000001000720800605009000900008"
    // log("problem 9:{}",transitionStr2Matrix(sudoStr9,3,9))
    // log("answer 9 :{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudoStr9,9),3,9))
    // console.timeEnd("algorithm-x-9")

    for(let i = 2 ; i< 10 ; i++){
        let wh = dlx.getWH(i)
        let tag = `algorithm-x-${{i}}`
        console.time(tag)
        let sudo = new Array(i*i).fill(0).map((_,idx)=>idx>i-1?0:idx+1).join('')
        log("{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudo,i),wh[0],i))
        console.timeEnd(tag)
    }
}
test()



