
import * as Poker from '../model/Poker';
import * as common from '../utils/common';
import * as Algorithm from '../algorithm/Algorithm';
import { qp_log } from '../utils/log';
import landlords from '../algorithm/landlords/landlordsAlgorithm';




function test(): void {

    // let mPair:Poker.CardPair = new Poker.CardPair()
    // qp_log('mPair',mPair)

    // let mCards:Array<Poker.Card> = []
    // mCards = mCards.concat(mPair.cards).concat(mPair.cards)
    // qp_log('mCards',mCards);

    // Algorithm.pokerDefaultSort(mCards)
    // qp_log('mCards--pokerDefaultSort',mCards)

    // Algorithm.rmArrayRepeat(mCards)
    // qp_log('mCards---rmArrayRepeat',mCards)

    // let pokers = landlords.getPokers()
    // qp_log(pokers);
    // landlords.shufflePokers(pokers)
    // qp_log(pokers);

    // let out1:Array<Poker.Card> = []
    // for(let i:number = 0 ; i< 9 ; i++){
    //     out1.push({color:Poker.Color.SPADE,value:Poker.Value.v_3+Math.floor(i/3)})
    // }
    // qp_log(out1)
    // let msg1:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out1))
    // qp_log(msg1)
    // let out2:Array<Poker.Card> = []
    // for(let i:number = 0 ; i< 12 ; i++){
    //     out2.push({color:Poker.Color.SPADE,value:Poker.Value.v_3+Math.floor(i/4)})
    // }
    // qp_log(out2)
    // let msg2:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out2))
    // qp_log(msg2)

    // let out3:Array<Poker.Card> = []
    // for(let i:number = 0 ; i< 5 ; i++){
    //     out3.push({color:Poker.Color.SPADE,value:Poker.Value.v_3})
    //     out3.push({color:Poker.Color.CLUB,value:Poker.Value.v_4})
    //     out3.push({color:Poker.Color.DIAMOND,value:Poker.Value.v_5})
    //     out3.push({color:Poker.Color.HEART,value:Poker.Value.v_6})
    // }
    // qp_log(out3)
    // let msg3:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out3))
    // qp_log(msg3)


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
    // qp_log(out4)
    // let msg4:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out4))
    // qp_log(msg4)

    //qp_log(Algorithm.get8Queen())
    //qp_log(Algorithm.dfsQueen(8))
    //for(let i = 3 ; i < 6 ; i++){
    //Algorithm.AllN(8)
    //}
    qp_log(Algorithm.AllN(3))
}

test()



