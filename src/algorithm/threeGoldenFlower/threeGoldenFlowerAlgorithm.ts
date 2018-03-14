import * as Poker from '../../model/Poker';
import * as Algorithm from '../Algorithm';
import * as common from '../../utils/common';

export namespace threeGoldenFlower {

    export const enum PokerType {
        SINGLE, //单张
        TWINS, //对子
        STRAIGHT,//顺子
        SAME_COLOR,//同花
        SAME_COLOR_STRAIGHT,//同花顺
        BOMB //炸弹／豹子
    }

    export interface TypeMsg {
        yes: boolean; //是否是此牌型
        type?: PokerType;//牌型
        weight?: number;//牌型之内牌的权值
    }

    /**
     * 是否是有效的牌值
     */
    export function isValidPokerNumber(poker: number): boolean {
        if (0 > poker) return false;
        let card: Poker.Card = Algorithm.numberToPoker(poker);
        if (0 > card.color || 0 > card.value) return false
        return Poker.Color.KING > card.color && Poker.Value.v_king_small > card.value
    }

    /**
     * 是否此数组为有效的牌值数组
     */
    export function isValidPokersArray(pokers: Array<number>): boolean {
        for (let e of pokers) {
            if (!isValidPokerNumber(e)) return false
        }
        return true
    }

    /**
     * 获取单张扑克大小
     * @param poker 
     */
    export function getPokerWeight(poker: number): number {
        let card: Poker.Card = Algorithm.numberToPoker(poker);
        return (card.value + 1) % (Poker.Value.v_2 + 1)
    }

    /**
    * 获取一组扑克权值的数组
    */
    export function getPokersWeight(pokers: Array<number>): Array<number> {
        let ws: Array<number> = []
        for (let e of pokers) {
            ws.push(getPokerWeight(e))
        }
        return ws
    }

    /**
     * 获取扑克类型权值
     */
    export function getPokerTypeWeight(type: PokerType): number {
        return type
    }


    /**
     * 数组转扑克组
     */
    export function pokersToCards(pokers: Array<number>): Array<Poker.Card> {
        let cards: Array<Poker.Card> = []
        for (let e of pokers) {
            cards.push(Algorithm.numberToPoker(e))
        }
        return cards
    }


    /**-----------------------------------
     *
     *   牌型判断函数  begin
     * -----------------------------------
     */

    /**
     * 是否为豹子
     */
    export function isBomb(pokers: Array<number>): TypeMsg {
        let ws: Array<number> = getPokersWeight(pokers)
        ws.sort()
        if (ws[0] === ws[2]) return {
            yes: true,
            type: PokerType.BOMB,
            weight: ws[0]
        }
        return {
            yes: false
        }
    }

    /**
     * 是否为同花顺
     */
    export function isSameColorStraight(pokers: Array<number>): TypeMsg {
        let sameColor = isSameColor(pokers)
        let staright = isStraight(pokers)
        if(sameColor.yes && staright.yes){
            return {
                yes:true,
                type:PokerType.SAME_COLOR_STRAIGHT,
                weight:staright.weight
            }
        }
        return {
            yes: false
        }        
    }

    /**
     * 是否为同花
     */
    export function isSameColor(pokers: Array<number>): TypeMsg {
        let cards: Array<Poker.Card> = pokersToCards(pokers)

        for (let card of cards) {
            if (card.color !== cards[0].color) {
                return {
                    yes: false
                }
            }
        }
        let ws: Array<number> = getPokersWeight(pokers)
        ws.sort()
        return {
            yes: true,
            type: PokerType.SAME_COLOR,
            weight: ws[0]
        }
    }

    /**
     * 是否为顺子
     */
    export function isStraight(pokers: Array<number>): TypeMsg {
        let ws: Array<number> = getPokersWeight(pokers)
        ws.sort()
        if(ws[0]+2===ws[1]+1&&ws[0]+2==ws[2]){
            return {
                yes:true,
                type:PokerType.STRAIGHT,
                weight:ws[2]
            }
        }
        let cards: Array<Poker.Card> = pokersToCards(pokers)
        cards.sort((a,b)=>{
            return a.value-b.value
        })
        if(Poker.Value.v_3 === cards[0].value
        &&Poker.Value.v_A === cards[1].value
        &&Poker.Value.v_2 === cards[2].value){
            return {
                yes:true,
                type:PokerType.STRAIGHT,
                weight:ws[1]
            }
        }
        return {
            yes: false
        }
    }

    /**
     * 是否为对子
     */
    export function isTwins(pokers: Array<number>): TypeMsg {
        let ws: Array<number> = getPokersWeight(pokers)
        ws.sort()
        if (ws[0] === ws[1]||ws[1]===ws[2]) return {
            yes: true,
            type: PokerType.TWINS,
            weight: ws[1]
        }
        return {
            yes: false
        }
    }

    /**
     * 是否为异色2,3,5
     */
    export function is235(pokers: Array<number>): TypeMsg{
        let cards: Array<Poker.Card> = pokersToCards(pokers)
        cards.sort((a,b)=>{
            return a.value-b.value
        })
        if(Poker.Value.v_3 === cards[0].value
        &&Poker.Value.v_5 === cards[1].value
        &&Poker.Value.v_2 === cards[2].value
        &&cards[0].color!=cards[1].color
        &&cards[0].color!=cards[2].color
        &&cards[1].color!=cards[2].color){
            return {
                yes:true
            }
        }
        return {
            yes: false
        }
    }

}