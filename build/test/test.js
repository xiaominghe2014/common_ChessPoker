"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithm = require("../algorithm/Algorithm");
var log_1 = require("../utils/log");
var SudoKu_1 = require("../algorithm/sudoku/SudoKu");
function test() {
    // let mPair:Poker.CardPair = new Poker.CardPair()
    // log('mPair',mPair)
    // let mCards:Array<Poker.Card> = []
    // mCards = mCards.concat(mPair.cards).concat(mPair.cards)
    // log('mCards',mCards);
    // Algorithm.pokerDefaultSort(mCards)
    // log('mCards--pokerDefaultSort',mCards)
    // Algorithm.rmArrayRepeat(mCards)
    // log('mCards---rmArrayRepeat',mCards)
    // let pokers = landlords.getPokers()
    // log(pokers);
    // landlords.shufflePokers(pokers)
    // log(pokers);
    // let out1:Array<Poker.Card> = []
    // for(let i:number = 0 ; i< 9 ; i++){
    //     out1.push({color:Poker.Color.SPADE,value:Poker.Value.v_3+Math.floor(i/3)})
    // }
    // log(out1)
    // let msg1:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out1))
    // log(msg1)
    // let out2:Array<Poker.Card> = []
    // for(let i:number = 0 ; i< 12 ; i++){
    //     out2.push({color:Poker.Color.SPADE,value:Poker.Value.v_3+Math.floor(i/4)})
    // }
    // log(out2)
    // let msg2:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out2))
    // log(msg2)
    // let out3:Array<Poker.Card> = []
    // for(let i:number = 0 ; i< 5 ; i++){
    //     out3.push({color:Poker.Color.SPADE,value:Poker.Value.v_3})
    //     out3.push({color:Poker.Color.CLUB,value:Poker.Value.v_4})
    //     out3.push({color:Poker.Color.DIAMOND,value:Poker.Value.v_5})
    //     out3.push({color:Poker.Color.HEART,value:Poker.Value.v_6})
    // }
    // log(out3)
    // let msg3:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out3))
    // log(msg3)
    // let out4:Array<Poker.Card> = []
    // for(let i:number = 0 ; i< 3 ; i++){
    //     out4.push({color:Poker.Color.SPADE,value:Poker.Value.v_3})
    //     out4.push({color:Poker.Color.CLUB,value:Poker.Value.v_4})
    //     out4.push({color:Poker.Color.DIAMOND,value:Poker.Value.v_5})
    //     out4.push({color:Poker.Color.HEART,value:Poker.Value.v_6})
    //     out4.push({color:Poker.Color.SPADE,value:Poker.Value.v_7})
    //     out4.push({color:Poker.Color.CLUB,value:Poker.Value.v_8})
    // }
    // out4.push({color:Poker.Color.SPADE,value:Poker.Value.v_7})
    // out4.push({color:Poker.Color.CLUB,value:Poker.Value.v_8})
    // log(out4)
    // let msg4:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out4))
    // log(msg4)
    //log(Algorithm.get8Queen())
    log_1.log("dfsQueen 8 is:{}", Algorithm.dfsQueen(8));
    //for(let i = 3 ; i < 6 ; i++){
    //Algorithm.AllN(8)
    //}
    log_1.log("AllN(3):{}", Algorithm.AllN(3));
    var ans = Algorithm.gaussSlutions([
        [1, 0, 5, 8],
        [3, 2, 3, 3],
        [-1, -3, 5, 7],
        [9, -5, 3, 6]
    ], [37, 34, 13, 26]);
    log_1.log("gaussSlutions:{}", ans);
    console.time("SudoKu");
    log_1.log("suduKu:{}", new SudoKu_1.SudoKu("010030000079004005000008640000001060500020007040300000085400000600200950000060020").solve());
    console.timeEnd("SudoKu");
}
test();
//# sourceMappingURL=test.js.map