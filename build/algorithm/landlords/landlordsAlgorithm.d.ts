declare namespace landlords {
    const enum PokerType {
        SINGLE = 0,
        TWINS = 1,
        BOMB_KING = 2,
        THREE = 3,
        THREE_BAND_1 = 4,
        BOMB = 5,
        THREE_BAND_2 = 6,
        STRAIGHT_1 = 7,
        STRAIGHT_2 = 8,
        STRAIGHT_3 = 9,
        FOUR_WITH_2 = 10,
        FOUR_WITH_4 = 11,
        PLANE_WITH_SINGLE = 12,
        PLANE_WITH_TWINS = 13,
    }
    interface PokersMsg {
        info: Array<number>;
        cards: Array<Array<number>>;
    }
    interface TypeMsg {
        yes: boolean;
        type?: PokerType;
        weight?: number;
        repeated?: number;
        pokers?: Array<number>;
    }
    /**
     * 相同牌型比较大小
     */
    function sameTypeSort(a: TypeMsg, b: TypeMsg): number;
    /**
     * 是否是有效的牌值
     */
    function isValidPokerNumber(poker: number): boolean;
    /**
     * 是否此数组为有效的牌值数组
     */
    function isValidPokersArray(pokers: Array<number>): boolean;
    /**
     * 获取单张扑克权值
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
     * 获取牌组信息
     */
    function getPokersMsg(pokers: Array<number>): PokersMsg;
    /**
     * 获取几副扑克牌
     */
    function getPokers(count?: number): Array<number>;
    /**
     * 洗牌
     */
    function shufflePokers(pokers: Array<number>): Array<number>;
    /**
     * 删除指定权值的若干张牌
     */
    function removeWeightFromArray(weight: number, count: number, pokers: Array<number>): number;
    /**
     * 是否全为对子
     */
    function isAllTwins(pokers: Array<number>): boolean;
    /**-----------------------------------
     *
     *   牌型判断函数  begin
     * -----------------------------------
     */
    /**
    * 是否是单张
    */
    function isSingle(pokers: Array<number>): TypeMsg;
    /**
     * 是否是对子
     */
    function isTwins(pokers: Array<number>): TypeMsg;
    /**
     * 是否是王炸
     */
    function isBombKing(pokers: Array<number>): TypeMsg;
    /**
     * 是否是三张
     */
    function isThree(pokers: Array<number>): TypeMsg;
    /**
     * 是否三带一
     */
    function isThreeBand1(pokers: Array<number>): TypeMsg;
    /**
     * 是否炸弹
     */
    function isBomb(pokers: Array<number>): TypeMsg;
    /**
     * 是否三带二
     */
    function isThreeBand2(pokers: Array<number>): TypeMsg;
    /**
     * 是否单顺
     */
    function isStraight1(pokers: Array<number>): TypeMsg;
    /**
     * 是否双顺
     */
    function isStraight2(pokers: Array<number>): TypeMsg;
    /**
     * 是否三顺
     */
    function isStraight3(pokers: Array<number>): TypeMsg;
    /**
     * 是否四带二
     */
    function isFour2(pokers: Array<number>): TypeMsg;
    /**
     * 是否四带两对
     */
    function isFour4(pokers: Array<number>): TypeMsg;
    /**
     * 是否飞机带单
     * 1.如果为飞机，则长度 为 len / 4
     * 2.先寻找所有的连续次数为 len / 4 或者以上的三张
     * 3.优先获取权值较大的满足条件的 三张
     * 4.判断是否存在，以及 返回
     */
    function isPlane1(pokers: Array<number>): TypeMsg;
    /**
     * 是否是飞机双
     * 1.如果为飞机，则长度 为 len / 5
     * 2.先寻找所有的连续次数为 len / 5 或者以上的三张
     * 3.筛选排除满足条件的三张之后剩余的是否全为对子
     * 4.判断是否存在，以及 返回
     */
    function isPlane2(pokers: Array<number>): TypeMsg;
    /**
     * 获取牌组类型
     * @param pokers
     */
    function getPokersTypes(pokers: Array<number>): Array<TypeMsg>;
    /**-----------------------------------
     *
     *   指定牌型获取  begin
     * -----------------------------------
     */
    /**
     * 获取所有的单牌，按照权值组合
     * @param pokers
     */
    function getAllSingle(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有得对子
     * @param pokers
     */
    function getAllTwins(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有的王炸
     * @param pokers
     */
    function getAllBombKing(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有的三张
     * @param pokers
     */
    function getAllThree(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有的三带一
     */
    function getAllThreeBand1(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有的三带二
     * @param pokers
     */
    function getAllThreeBand2(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有的炸弹
     * @param pokers
     */
    function getAllBomb(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有指定长度的单顺
     * @param len
     * @param pokers
     */
    function getAllStraight1(len: number, pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有指定长度的双顺
     * @param len
     * @param pokers
     */
    function getAllStraight2(len: number, pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有指定长度的三顺
     * @param len
     * @param pokers
     */
    function getAllStraight3(len: number, pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有的4带2
     * @param pokers
     */
    function getAllFour2(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有的4带2对
     * @param pokers
     */
    function getAllFour4(pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有指定长度的飞机单
     * @param len
     * @param pokers
     */
    function getAllPlane1(len: number, pokers: Array<number>): Array<TypeMsg>;
    /**
     * 获取所有指定长度的飞机双
     * @param len
     * @param pokers
     */
    function getAllPlane2(len: number, pokers: Array<number>): Array<TypeMsg>;
}
export default landlords;
