import { Poker } from '../model/Poker';
import { common } from '../utils/common';
import { Algorithm } from '../algorithm/Algorithm';
import { qp_log } from '../utils/log';
import { landlordsAlgorithm as landlords } from '../algorithm/landlords/landlordsAlgorithm';

function test():void{

    let mPair:Poker.CardPair = new Poker.CardPair()
    qp_log('mPair',mPair)

    let mCards:Array<Poker.Card> = [].concat(mPair.cards).concat(mPair.cards)
    qp_log('mCards',mCards);

    Algorithm.pokerDefaultSort(mCards)
    qp_log('mCards--pokerDefaultSort',mCards)

    Algorithm.rmArrayRepeat(mCards)
    qp_log('mCards---rmArrayRepeat',mCards)

    let pokers = landlords.getPokers()
    qp_log(pokers);
    landlords.shufflePokers(pokers)
    qp_log(pokers);
    
    let out1:Array<Poker.Card> = []
    for(let i:number = 0 ; i< 9 ; i++){
        out1.push({color:Poker.Color.SPADE,value:Poker.Value.v_3+Math.floor(i/3)})
    }
    qp_log(out1)
    let msg1:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out1))
    qp_log(msg1)
    let out2:Array<Poker.Card> = []
    for(let i:number = 0 ; i< 12 ; i++){
        out2.push({color:Poker.Color.SPADE,value:Poker.Value.v_3+Math.floor(i/4)})
    }
    qp_log(out2)
    let msg2:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out2))
    qp_log(msg2)

    let out3:Array<Poker.Card> = []
    for(let i:number = 0 ; i< 5 ; i++){
        out3.push({color:Poker.Color.SPADE,value:Poker.Value.v_3})
        out3.push({color:Poker.Color.CLUB,value:Poker.Value.v_4})
        out3.push({color:Poker.Color.DIAMOND,value:Poker.Value.v_5})
        out3.push({color:Poker.Color.HEART,value:Poker.Value.v_6})
    }
    qp_log(out3)
    let msg3:Array<landlords.TypeMsg> = landlords.getPokersTypes(Algorithm.pokersToArray(out3))
    qp_log(msg3)
}

test()



