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
}

test()



