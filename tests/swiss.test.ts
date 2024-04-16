
import { log } from '../src/utils/log';
import swissSys from '../src/algorithm/swissSys/SwissSys';



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
    log( "[round:"+round+"]"+str);
}

function test(): void {

    // for(let i=1; i<100 ; i ++){
    //     let wh = dlx.getWH(i)
    //     console.log(i,wh[0],wh[1])
    // }
    let r1 = swissSys.layoutFirst(9);
    desRotation(r1);
    // r1.againsts[1].first.scores+=1;
    let r2 = swissSys.layoutNext([r1]);
    // r2.againsts[2].first.scores+=1;
    desRotation(r2);
    let r3 = swissSys.layoutNext([r1,r2]);
    // r3.againsts[3].first.scores+=1;
    desRotation(r3);
    let r4 = swissSys.layoutNext([r1,r2,r3]);
    desRotation(r4);
    let r5 = swissSys.layoutNext([r1,r2,r3,r4]);
    desRotation(r5);
    let r6 = swissSys.layoutNext([r1,r2,r3,r4,r5]);
    desRotation(r6);


    // log("gaussSolutions:{}",ans)
    // console.time("algorithm-x-9")
    // let sudoStr9 = "500002000400708001083000900000000390040070010065000000001000720800605009000900008"
    // log("problem 9:{}",transitionStr2Matrix(sudoStr9,3,9))
    // log("answer 9 :{}",transitionStr2Matrix(dlx.solveStandardSudoku(sudoStr9,9),3,9))
    // console.timeEnd("algorithm-x-9")

}
test()



