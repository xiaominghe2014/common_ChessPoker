import * as Poker from '../../model/Poker';
declare namespace threeGoldenFlower {
    const enum PokerType {
        SINGLE = 0,
        TWINS = 1,
        STRAIGHT = 2,
        SAME_COLOR = 3,
        SAME_COLOR_STRAIGHT = 4,
        BOMB = 5
    }
    interface TypeMsg {
        yes: boolean;
        type?: PokerType;
        weight?: number;
    }
    /**
     * 是否是有效的牌值
     */
    function isValidPokerNumber(poker: number): boolean;
    /**
     * 是否此数组为有效的牌值数组
     */
    function isValidPokersArray(pokers: Array<number>): boolean;
    /**
     * 获取单张扑克大小
     * @param poker
     */
    function getPokerWeight(poker: number): number;
    /**
    * 获取一组扑克权值的数组
    */
    function getPokersWeight(pokers: Array<number>): Array<number>;
    /**
     * 获取扑克类型权值
     */
    function getPokerTypeWeight(type: PokerType): number;
    /**
     * 数组转扑克组
     */
    function pokersToCards(pokers: Array<number>): Array<Poker.Card>;
    /**-----------------------------------
     *
     *   牌型判断函数  begin
     * -----------------------------------
     */
    /**
     * 是否为豹子
     */
    function isBomb(pokers: Array<number>): TypeMsg;
    /**
     * 是否为同花顺
     */
    function isSameColorStraight(pokers: Array<number>): TypeMsg;
    /**
     * 是否为同花
     */
    function isSameColor(pokers: Array<number>): TypeMsg;
    /**
     * 是否为顺子
     */
    function isStraight(pokers: Array<number>): TypeMsg;
    /**
     * 是否为对子
     */
    function isTwins(pokers: Array<number>): TypeMsg;
    /**
     * 是否为异色2,3,5
     */
    function is235(pokers: Array<number>): TypeMsg;
}
export default threeGoldenFlower;
