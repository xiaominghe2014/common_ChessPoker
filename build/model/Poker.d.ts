/**
 * Author: Xiaoming
 * Contact: xiaominghe2014@gmail.com
 * Date:2018/3/12
 */
export declare const enum Color {
    SPADE = 0,
    HEART = 1,
    CLUB = 2,
    DIAMOND = 3,
    KING = 4,
    BACK = 5,
}
export declare const enum Value {
    v_3 = 0,
    v_4 = 1,
    v_5 = 2,
    v_6 = 3,
    v_7 = 4,
    v_8 = 5,
    v_9 = 6,
    v_10 = 7,
    v_J = 8,
    v_Q = 9,
    v_K = 10,
    v_A = 11,
    v_2 = 12,
    v_king_small = 13,
    v_king_big = 14,
    v_back = 15,
}
export interface Card {
    color: Color;
    value: Value;
}
/**
 * 一副牌
 */
export declare class CardPair {
    cards: Array<Card>;
    moveCards: Array<Card>;
    constructor(moveCards?: Array<Card>);
    getCards(): Array<Card>;
    private initDefaultCards();
}
