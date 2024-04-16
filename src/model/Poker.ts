import * as common from 'utils/common';

/**
 * Author: Xiaoming
 * Contact: xiaominghe2014@gmail.com
 * Date:2018/3/12
 */

export const enum Color {
    SPADE, //黑桃
    HEART, //红桃
    CLUB,//梅花
    DIAMOND,//方块
    KING, //王
    BACK //牌背
}

export const enum Value {
    v_3,
    v_4,
    v_5,
    v_6,
    v_7,
    v_8,
    v_9,
    v_10,
    v_J,
    v_Q,
    v_K,
    v_A,
    v_2,
    v_king_small,
    v_king_big,
    v_back
}

export interface Card {
    color: Color;
    value: Value;
}

/**
 * 一副牌
 */
export class CardPair {
    cards: Array<Card>;
    moveCards: Array<Card>;
    public constructor(moveCards: Array<Card> = []) {
        this.moveCards = moveCards;
        this.initDefaultCards();
    }

    public getCards(): Array<Card> {
        return this.cards
    }

    private initDefaultCards(): void {
        this.cards = []
        for (let i = Color.SPADE; i < Color.KING; i++) {
            for (let j = Value.v_3; j < Value.v_king_small; j++) {
                this.cards.push({ color: i, value: j })
            }
        }
        this.cards.push({ color: Color.KING, value: Value.v_king_small })
        this.cards.push({ color: Color.KING, value: Value.v_king_big })
        common.removeAFromB<Card>(this.moveCards, this.cards)
    }
}

