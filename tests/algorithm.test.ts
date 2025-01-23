import * as Algorithm from '../src/algorithm/Algorithm';
import { log } from '../src/utils/log';

Algorithm.combination([1,2,3,4,5],3).forEach((e)=>log("combination:{}",e));
// log("dfsQueen 8 is:{}",Algorithm.dfsQueen(8));
// log("AllN(3):{}",Algorithm.AllN(3));

// let ans = Algorithm.gaussSolutions([
//     [1,0,5,8],
//     [3,2,3,3],
//     [-1,-3,5,7],
//     [9,-5,3,6]
// ],[37,34,13,26]);

// log("Algorithm.gaussSolutions:{}",ans)