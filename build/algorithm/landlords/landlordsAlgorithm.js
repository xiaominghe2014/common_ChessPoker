"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Poker = require("../../model/Poker");
var Algorithm = require("../Algorithm");
var common = require("../../utils/common");
var landlords;
(function (landlords) {
    var king_small = 65;
    var king_big = 66;
    var p_2_weight = 12;
    /**
     * 相同牌型比较大小
     */
    function sameTypeSort(a, b) {
        var weightA = a.weight || 0 + (a.repeated || 0) * 100;
        var weightB = b.weight || 0 + (b.repeated || 0) * 100;
        return weightA - weightB;
    }
    landlords.sameTypeSort = sameTypeSort;
    /**
     * 是否是有效的牌值
     */
    function isValidPokerNumber(poker) {
        if (0 > poker)
            return false;
        var card = Algorithm.numberToPoker(poker);
        if (0 > card.color || 0 > card.value)
            return false;
        return 5 /* Poker.Color.BACK */ > card.color && 15 /* Poker.Value.v_back */ > card.value;
    }
    landlords.isValidPokerNumber = isValidPokerNumber;
    /**
     * 是否此数组为有效的牌值数组
     */
    function isValidPokersArray(pokers) {
        for (var _i = 0, pokers_1 = pokers; _i < pokers_1.length; _i++) {
            var e = pokers_1[_i];
            if (!isValidPokerNumber(e))
                return false;
        }
        return true;
    }
    landlords.isValidPokersArray = isValidPokersArray;
    /**
     * 获取单张扑克权值
     */
    function getPokerWeight(poker) {
        return Algorithm.numberToPoker(poker).value;
    }
    landlords.getPokerWeight = getPokerWeight;
    /**
     * 获取一组扑克权值的数组
     */
    function getPokersWeight(pokers) {
        var ws = [];
        for (var _i = 0, pokers_2 = pokers; _i < pokers_2.length; _i++) {
            var e = pokers_2[_i];
            ws.push(getPokerWeight(e));
        }
        return ws;
    }
    landlords.getPokersWeight = getPokersWeight;
    /**
     * 获取扑克类型权值
     */
    function getPokerTypeWeight(type) {
        switch (type) {
            case 2 /* PokerType.BOMB_KING */:
                return 100;
            case 5 /* PokerType.BOMB */:
                return 10;
            default:
                return 0;
        }
    }
    landlords.getPokerTypeWeight = getPokerTypeWeight;
    /**
     * 获取牌组信息
     */
    function getPokersMsg(pokers) {
        var info = [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ];
        var cards = [
            [], [], [], [], [],
            [], [], [], [], [],
            [], [], [], [], []
        ];
        var len = pokers.length;
        for (var i = 0; i < len; i++) {
            var w = getPokerWeight(pokers[i]);
            info[w]++;
            cards[w].push(pokers[i]);
        }
        return { info: info, cards: cards };
    }
    landlords.getPokersMsg = getPokersMsg;
    /**
     * 获取几副扑克牌
     */
    function getPokers(count) {
        if (count === void 0) { count = 1; }
        var res = [];
        for (var i = 0; i < count; i++) {
            res = res.concat(Algorithm.pokersToArray((new Poker.CardPair()).getCards()));
        }
        return res;
    }
    landlords.getPokers = getPokers;
    /**
     * 洗牌
     */
    function shufflePokers(pokers) {
        return Algorithm.shuffleArray(pokers);
    }
    landlords.shufflePokers = shufflePokers;
    /**
     * 删除指定权值的若干张牌
     */
    function removeWeightFromArray(weight, count, pokers) {
        var tmp = [];
        tmp = tmp.concat(pokers);
        for (var _i = 0, tmp_1 = tmp; _i < tmp_1.length; _i++) {
            var e = tmp_1[_i];
            var w = getPokerWeight(e);
            if (w === weight && count > 0) {
                common.removeElementFromArray(e, pokers);
                count--;
            }
        }
        return count;
    }
    landlords.removeWeightFromArray = removeWeightFromArray;
    /**
     * 是否全为对子
     */
    function isAllTwins(pokers) {
        var len = pokers.length;
        if (2 <= len && 0 === len % 2) {
            var msg = getPokersMsg(pokers);
            for (var i = 0; i < msg.info.length; i++) {
                if (msg.info[i] && 0 != msg.info[i] % 2)
                    return false;
            }
            return true;
        }
        return false;
    }
    landlords.isAllTwins = isAllTwins;
    /**-----------------------------------
     *
     *   牌型判断函数  begin
     * -----------------------------------
     */
    /**
    * 是否是单张
    */
    function isSingle(pokers) {
        if (1 === pokers.length) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            return {
                yes: true,
                type: 0 /* PokerType.SINGLE */,
                weight: ws[0],
                repeated: 1,
                pokers: pokers
            };
        }
        return {
            yes: false
        };
    }
    landlords.isSingle = isSingle;
    /**
     * 是否是对子
     */
    function isTwins(pokers) {
        if (2 === pokers.length) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (ws[0] === ws[1]) {
                return {
                    yes: true,
                    type: 1 /* PokerType.TWINS */,
                    weight: ws[0],
                    repeated: 1,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isTwins = isTwins;
    /**
     * 是否是王炸
     */
    function isBombKing(pokers) {
        if (2 === pokers.length) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (king_small == pokers[0] || king_big == pokers[0]) {
                if (king_small == pokers[1] || king_big == pokers[1]) {
                    return {
                        yes: true,
                        type: 2 /* PokerType.BOMB_KING */,
                        weight: ws[0],
                        repeated: 1,
                        pokers: pokers
                    };
                }
            }
        }
        return {
            yes: false
        };
    }
    landlords.isBombKing = isBombKing;
    /**
     * 是否是三张
     */
    function isThree(pokers) {
        if (3 === pokers.length) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (ws[0] === ws[2]) {
                return {
                    yes: true,
                    type: 3 /* PokerType.THREE */,
                    weight: ws[0],
                    repeated: 1,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isThree = isThree;
    /**
     * 是否三带一
     */
    function isThreeBand1(pokers) {
        if (4 === pokers.length) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (ws[0] === ws[2] || ws[1] === ws[3]) {
                return {
                    yes: true,
                    type: 4 /* PokerType.THREE_BAND_1 */,
                    weight: ws[1],
                    repeated: 1,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isThreeBand1 = isThreeBand1;
    /**
     * 是否炸弹
     */
    function isBomb(pokers) {
        if (4 === pokers.length) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (ws[0] === ws[3]) {
                return {
                    yes: true,
                    type: 5 /* PokerType.BOMB */,
                    weight: ws[0],
                    repeated: 1,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isBomb = isBomb;
    /**
     * 是否三带二
     */
    function isThreeBand2(pokers) {
        if (5 === pokers.length) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (ws[0] === ws[2] && ws[3] === ws[4] || (ws[0] === ws[1] && ws[2] === ws[4])) {
                return {
                    yes: true,
                    type: 6 /* PokerType.THREE_BAND_2 */,
                    weight: ws[2],
                    repeated: 1,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isThreeBand2 = isThreeBand2;
    /**
     * 是否单顺
     */
    function isStraight1(pokers) {
        var len = pokers.length;
        if (5 <= len) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (p_2_weight > ws[len - 1]) {
                for (var i = 0; i < len - 1; i++) {
                    if (ws[i] + 1 !== ws[i + 1])
                        return {
                            yes: false
                        };
                }
                return {
                    yes: true,
                    type: 7 /* PokerType.STRAIGHT_1 */,
                    weight: ws[0],
                    repeated: len,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isStraight1 = isStraight1;
    /**
     * 是否双顺
     */
    function isStraight2(pokers) {
        var len = pokers.length;
        if (6 <= len && 0 === len % 2) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (p_2_weight > ws[len - 1]) {
                var msg = getPokersMsg(pokers);
                for (var i = ws[0]; i < ws[len - 1] + 1; i++) {
                    if (2 !== msg.info[i])
                        return {
                            yes: false
                        };
                }
                return {
                    yes: true,
                    type: 8 /* PokerType.STRAIGHT_2 */,
                    weight: ws[0],
                    repeated: len,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isStraight2 = isStraight2;
    /**
     * 是否三顺
     */
    function isStraight3(pokers) {
        var len = pokers.length;
        if (9 <= len && 0 === len % 3) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (p_2_weight > ws[len - 1]) {
                var msg = getPokersMsg(pokers);
                for (var i = ws[0]; i < ws[len - 1] + 1; i++) {
                    if (3 !== msg.info[i])
                        return {
                            yes: false
                        };
                }
                return {
                    yes: true,
                    type: 9 /* PokerType.STRAIGHT_3 */,
                    weight: ws[0],
                    repeated: len,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isStraight3 = isStraight3;
    /**
     * 是否四带二
     */
    function isFour2(pokers) {
        var len = pokers.length;
        if (6 === len) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            if (ws[2] === ws[5] || ws[1] === ws[4] || ws[0] === ws[3]) {
                return {
                    yes: true,
                    type: 10 /* PokerType.FOUR_WITH_2 */,
                    weight: ws[2],
                    repeated: 1,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isFour2 = isFour2;
    /**
     * 是否四带两对
     */
    function isFour4(pokers) {
        var len = pokers.length;
        if (8 === len) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            var indexArr = [
                [4, 7, 2, 3, 0, 1],
                [2, 5, 6, 7, 0, 1],
                [0, 3, 4, 5, 6, 7] //1111 22 33
            ];
            for (var i = 0; i < indexArr.length; i++) {
                if (ws[indexArr[i][0]] === ws[indexArr[i][1]]
                    && ws[indexArr[i][2]] === ws[indexArr[i][3]]
                    && ws[indexArr[i][4]] === ws[indexArr[i][5]]) {
                    return {
                        yes: true,
                        type: 11 /* PokerType.FOUR_WITH_4 */,
                        weight: ws[indexArr[i][0]],
                        repeated: 1,
                        pokers: pokers
                    };
                }
            }
        }
        return {
            yes: false
        };
    }
    landlords.isFour4 = isFour4;
    /**
     * 是否飞机带单
     * 1.如果为飞机，则长度 为 len / 4
     * 2.先寻找所有的连续次数为 len / 4 或者以上的三张
     * 3.优先获取权值较大的满足条件的 三张
     * 4.判断是否存在，以及 返回
     */
    function isPlane1(pokers) {
        var len = pokers.length;
        if (8 <= len && 0 == len % 4) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            var msg = getPokersMsg(pokers);
            var planeLen = len / 4;
            var startIndex = 0;
            var threeArr = [];
            var three = [];
            for (var i = ws[0]; i < ws[len - 1] + 1 && i < p_2_weight; i++) {
                if (3 <= msg.info[i]) {
                    three.push(i);
                    startIndex++;
                }
                else {
                    if (planeLen <= startIndex) {
                        var tmp = [];
                        for (var _i = 0, three_1 = three; _i < three_1.length; _i++) {
                            var e = three_1[_i];
                            tmp.push(e);
                        }
                        threeArr.push(tmp);
                    }
                    startIndex = 0;
                    three = [];
                }
            }
            if (planeLen <= startIndex) {
                var tmp = [];
                for (var _a = 0, three_2 = three; _a < three_2.length; _a++) {
                    var e = three_2[_a];
                    tmp.push(e);
                }
                threeArr.push(tmp);
            }
            // startIndex = 0
            // three = []               
            if (threeArr.length) {
                //取最大值
                var max = 0;
                for (var _b = 0, threeArr_1 = threeArr; _b < threeArr_1.length; _b++) {
                    var e = threeArr_1[_b];
                    var lenE = e.length;
                    max = e[lenE - 1] > max ? e[lenE - 1] : max;
                }
                return {
                    yes: true,
                    type: 12 /* PokerType.PLANE_WITH_SINGLE */,
                    weight: max,
                    repeated: len / 4,
                    pokers: pokers
                };
            }
        }
        return {
            yes: false
        };
    }
    landlords.isPlane1 = isPlane1;
    /**
     * 是否是飞机双
     * 1.如果为飞机，则长度 为 len / 5
     * 2.先寻找所有的连续次数为 len / 5 或者以上的三张
     * 3.筛选排除满足条件的三张之后剩余的是否全为对子
     * 4.判断是否存在，以及 返回
     */
    function isPlane2(pokers) {
        var len = pokers.length;
        if (10 <= len && 0 == len % 5) {
            var ws = getPokersWeight(pokers);
            ws.sort();
            var msg = getPokersMsg(pokers);
            var planeLen = len / 5;
            var startIndex = 0;
            var threeArr = [];
            var three = [];
            for (var i = ws[0]; i < ws[len - 1] + 1 && i < p_2_weight; i++) {
                if (3 <= msg.info[i]) {
                    three.push(i);
                    startIndex++;
                }
                else {
                    if (planeLen <= startIndex) {
                        var tmp = [];
                        for (var _i = 0, three_3 = three; _i < three_3.length; _i++) {
                            var e = three_3[_i];
                            tmp.push(e);
                        }
                        threeArr.push(tmp);
                    }
                    startIndex = 0;
                    three = [];
                }
            }
            if (planeLen <= startIndex) {
                var tmp = [];
                for (var _a = 0, three_4 = three; _a < three_4.length; _a++) {
                    var e = three_4[_a];
                    tmp.push(e);
                }
                threeArr.push(tmp);
            }
            // startIndex = 0
            // three = []
            if (threeArr.length) {
                //筛选
                var threeArr2 = [];
                var three2 = [];
                var threeArrLen = threeArr.length;
                for (var k = 0; k < threeArrLen; k++) {
                    var t = [];
                    t = t.concat(threeArr[k]);
                    while (planeLen <= t.length) {
                        var tmpPokers = [];
                        tmpPokers = tmpPokers.concat(pokers);
                        for (var j = 0; j < planeLen; j++) {
                            three2.push(t[t.length - j - 1]);
                            removeWeightFromArray(t[t.length - j - 1], 3, tmpPokers);
                        }
                        if (isAllTwins(tmpPokers)) {
                            three2.sort();
                            var tt = [];
                            tt = tt.concat(three2);
                            threeArr2.push(tt);
                        }
                        three2 = [];
                        common.removeElementFromArray(t[t.length - 1], t);
                    }
                }
                if (threeArr2.length) {
                    //取最大值
                    var max = -1;
                    for (var _b = 0, threeArr2_1 = threeArr2; _b < threeArr2_1.length; _b++) {
                        var e = threeArr2_1[_b];
                        var lenE = e.length;
                        max = e[lenE - 1] > max ? e[lenE - 1] : max;
                    }
                    return {
                        yes: true,
                        type: 13 /* PokerType.PLANE_WITH_TWINS */,
                        weight: max,
                        repeated: len / 5,
                        pokers: pokers
                    };
                }
            }
        }
        return {
            yes: false
        };
    }
    landlords.isPlane2 = isPlane2;
    /**
     * 获取牌组类型
     * @param pokers
     */
    function getPokersTypes(pokers) {
        var res = [];
        if (isValidPokersArray(pokers)) {
            var SINGLE = isSingle(pokers);
            if (SINGLE.yes) {
                res.push(SINGLE);
            }
            var TWINS = isTwins(pokers);
            if (TWINS.yes) {
                res.push(TWINS);
            }
            var BOMB_KING = isBombKing(pokers);
            if (BOMB_KING.yes) {
                res.push(BOMB_KING);
            }
            var THREE = isThree(pokers);
            if (THREE.yes) {
                res.push(THREE);
            }
            var THREE_BAND_1 = isThreeBand1(pokers);
            if (THREE_BAND_1.yes) {
                res.push(THREE_BAND_1);
            }
            var THREE_BAND_2 = isThreeBand2(pokers);
            if (THREE_BAND_2.yes) {
                res.push(THREE_BAND_2);
            }
            var BOMB = isBomb(pokers);
            if (BOMB.yes) {
                res.push(BOMB);
            }
            var STRAIGHT_1 = isStraight1(pokers);
            if (STRAIGHT_1.yes) {
                res.push(STRAIGHT_1);
            }
            var STRAIGHT_2 = isStraight2(pokers);
            if (STRAIGHT_2.yes) {
                res.push(STRAIGHT_2);
            }
            var STRAIGHT_3 = isStraight3(pokers);
            if (STRAIGHT_3.yes) {
                res.push(STRAIGHT_3);
            }
            var FOUR_WITH_2 = isFour2(pokers);
            if (FOUR_WITH_2.yes) {
                res.push(FOUR_WITH_2);
            }
            var FOUR_WITH_4 = isFour4(pokers);
            if (FOUR_WITH_4.yes) {
                res.push(FOUR_WITH_4);
            }
            var PLANE_WITH_SINGLE = isPlane1(pokers);
            if (PLANE_WITH_SINGLE.yes) {
                res.push(PLANE_WITH_SINGLE);
            }
            var PLANE_WITH_TWINS = isPlane2(pokers);
            if (PLANE_WITH_TWINS.yes) {
                res.push(PLANE_WITH_TWINS);
            }
        }
        if (res.length)
            return res;
        return [{
                yes: false
            }];
    }
    landlords.getPokersTypes = getPokersTypes;
    /**-----------------------------------
     *
     *   指定牌型获取  begin
     * -----------------------------------
     */
    /**
     * 获取所有的单牌，按照权值组合
     * @param pokers
     */
    function getAllSingle(pokers) {
        var res = [];
        if (pokers.length) {
            var msg = getPokersMsg(pokers);
            for (var i in msg.info) {
                if (msg.info[i]) {
                    res.push(isSingle([msg.cards[i][0]]));
                }
            }
        }
        return res;
    }
    landlords.getAllSingle = getAllSingle;
    /**
     * 获取所有得对子
     * @param pokers
     */
    function getAllTwins(pokers) {
        var res = [];
        if (2 <= pokers.length) {
            var msg = getPokersMsg(pokers);
            for (var i in msg.info) {
                if (2 <= msg.info[i]) {
                    res.push(isTwins([msg.cards[i][0], msg.cards[i][1]]));
                }
            }
        }
        return res;
    }
    landlords.getAllTwins = getAllTwins;
    /**
     * 获取所有的王炸
     * @param pokers
     */
    function getAllBombKing(pokers) {
        var res = [];
        if (2 <= pokers.length) {
            var msg = getPokersMsg(pokers);
            if (2 <= msg.info[13]) {
                res.push(isBombKing([king_small, king_small]));
            }
            if (msg.info[13] && msg.info[14]) {
                res.push(isBombKing([king_small, king_big]));
            }
            if (2 <= msg.info[13]) {
                res.push(isBombKing([king_big, king_big]));
            }
        }
        return res;
    }
    landlords.getAllBombKing = getAllBombKing;
    /**
     * 获取所有的三张
     * @param pokers
     */
    function getAllThree(pokers) {
        var res = [];
        var msg = getPokersMsg(pokers);
        for (var i in msg.info) {
            if (3 <= msg.info[i]) {
                res.push(isThree([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2]]));
            }
        }
        return res;
    }
    landlords.getAllThree = getAllThree;
    /**
     * 获取所有的三带一
     */
    function getAllThreeBand1(pokers) {
        var res = [];
        var pLen = pokers.length;
        if (4 <= pLen) {
            var msg = getPokersMsg(pokers);
            for (var i in msg.info) {
                if (3 <= msg.info[i]) {
                    var tmp = [];
                    tmp = tmp.concat(pokers);
                    common.removeAFromB([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2]], tmp);
                    if (tmp.length) {
                        tmp.sort((function (a, b) {
                            return getPokerWeight(a) - getPokerWeight(b);
                        }));
                        res.push(isThreeBand1([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2], tmp[0]]));
                    }
                }
            }
        }
        return res;
    }
    landlords.getAllThreeBand1 = getAllThreeBand1;
    /**
     * 获取所有的三带二
     * @param pokers
     */
    function getAllThreeBand2(pokers) {
        var res = [];
        var pLen = pokers.length;
        if (5 <= pLen) {
            var msg = getPokersMsg(pokers);
            for (var i in msg.info) {
                if (3 <= msg.info[i]) {
                    var tmp = [];
                    tmp = tmp.concat(pokers);
                    common.removeAFromB([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2]], tmp);
                    if (tmp.length) {
                        var twins = getAllTwins(tmp);
                        if (twins.length) {
                            var two = twins[0].pokers || [];
                            res.push(isThreeBand2([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2]].concat(two)));
                        }
                    }
                }
            }
        }
        return res;
    }
    landlords.getAllThreeBand2 = getAllThreeBand2;
    /**
     * 获取所有的炸弹
     * @param pokers
     */
    function getAllBomb(pokers) {
        var res = [];
        var pLen = pokers.length;
        if (4 <= pLen) {
            var msg = getPokersMsg(pokers);
            for (var i in msg.info) {
                if (4 <= msg.info[i]) {
                    res.push(isBomb([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2], msg.cards[i][3]]));
                }
            }
        }
        return res;
    }
    landlords.getAllBomb = getAllBomb;
    /**
     * 获取所有指定长度的单顺
     * @param len
     * @param pokers
     */
    function getAllStraight1(len, pokers) {
        var res = [];
        var pLen = pokers.length;
        if ( /*5 <= len && */len <= pLen) {
            var msg = getPokersMsg(pokers);
            var start = 0;
            var searchIndex = 0;
            var indexArr = [];
            for (var i = 0; i < p_2_weight; i++) {
                if (msg.info[i]) {
                    start++;
                    indexArr.push(msg.cards[i][0]);
                    if (len === start) {
                        res.push(isStraight1(common.getCopyArray(indexArr)));
                        start = 0;
                        indexArr = [];
                        searchIndex++;
                        i = searchIndex - 1;
                    }
                }
                else {
                    searchIndex++;
                    start = 0;
                    indexArr = [];
                }
            }
        }
        return res;
    }
    landlords.getAllStraight1 = getAllStraight1;
    /**
     * 获取所有指定长度的双顺
     * @param len
     * @param pokers
     */
    function getAllStraight2(len, pokers) {
        var res = [];
        var pLen = pokers.length;
        if ( /*6 <= len && */len <= pLen && 0 === len % 2) {
            var msg = getPokersMsg(pokers);
            var start = 0;
            var searchIndex = 0;
            var indexArr = [];
            for (var i = 0; i < p_2_weight; i++) {
                if (2 <= msg.info[i]) {
                    start++;
                    indexArr.push(msg.cards[i][0]);
                    indexArr.push(msg.cards[i][1]);
                    if (len === start) {
                        res.push(isStraight2(common.getCopyArray(indexArr)));
                        start = 0;
                        indexArr = [];
                        searchIndex++;
                        i = searchIndex - 1;
                    }
                }
                else {
                    searchIndex++;
                    start = 0;
                    indexArr = [];
                }
            }
        }
        return res;
    }
    landlords.getAllStraight2 = getAllStraight2;
    /**
     * 获取所有指定长度的三顺
     * @param len
     * @param pokers
     */
    function getAllStraight3(len, pokers) {
        var res = [];
        var pLen = pokers.length;
        if ( /*9 <= len && */len <= pLen && 0 === len % 3) {
            var msg = getPokersMsg(pokers);
            var start = 0;
            var searchIndex = 0;
            var indexArr = [];
            for (var i = 0; i < p_2_weight; i++) {
                if (3 <= msg.info[i]) {
                    start++;
                    indexArr.push(msg.cards[i][0]);
                    indexArr.push(msg.cards[i][1]);
                    indexArr.push(msg.cards[i][2]);
                    if (len === start) {
                        res.push(isStraight3(common.getCopyArray(indexArr)));
                        start = 0;
                        indexArr = [];
                        searchIndex++;
                        i = searchIndex - 1;
                    }
                }
                else {
                    searchIndex++;
                    start = 0;
                    indexArr = [];
                }
            }
        }
        return res;
    }
    landlords.getAllStraight3 = getAllStraight3;
    /**
     * 获取所有的4带2
     * @param pokers
     */
    function getAllFour2(pokers) {
        var res = [];
        var pLen = pokers.length;
        if (6 <= pLen) {
            var msg = getPokersMsg(pokers);
            for (var i in msg.info) {
                if (4 <= msg.info[i]) {
                    var tmp = [];
                    tmp = tmp.concat(pokers);
                    common.removeAFromB([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2], msg.cards[i][3]], tmp);
                    if (2 <= tmp.length) {
                        tmp.sort((function (a, b) {
                            return getPokerWeight(a) - getPokerWeight(b);
                        }));
                        res.push(isFour2([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2], msg.cards[i][3],
                            tmp[0], tmp[1]]));
                    }
                }
            }
        }
        return res;
    }
    landlords.getAllFour2 = getAllFour2;
    /**
     * 获取所有的4带2对
     * @param pokers
     */
    function getAllFour4(pokers) {
        var res = [];
        var pLen = pokers.length;
        if (8 <= pLen) {
            var msg = getPokersMsg(pokers);
            for (var i in msg.info) {
                if (4 <= msg.info[i]) {
                    var tmp = [];
                    tmp = tmp.concat(pokers);
                    common.removeAFromB([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2], msg.cards[i][3]], tmp);
                    if (4 <= tmp.length) {
                        var twins = getAllTwins(tmp);
                        if (2 <= twins.length) {
                            var two0 = twins[0].pokers || [];
                            var two1 = twins[1].pokers || [];
                            res.push(isFour4([msg.cards[i][0], msg.cards[i][1], msg.cards[i][2], msg.cards[i][3],
                                two0[0], two0[1], two1[0], two1[1]
                            ]));
                        }
                    }
                }
            }
        }
        return res;
    }
    landlords.getAllFour4 = getAllFour4;
    /**
     * 获取所有指定长度的飞机单
     * @param len
     * @param pokers
     */
    function getAllPlane1(len, pokers) {
        var res = [];
        var pLen = pokers.length;
        if (8 <= len && 0 === len % 4 && len <= pLen) {
            var straight3 = getAllStraight3(len, pokers);
            for (var _i = 0, straight3_1 = straight3; _i < straight3_1.length; _i++) {
                var msg = straight3_1[_i];
                if (msg.yes) {
                    var tmp = [];
                    tmp = tmp.concat(pokers);
                    common.removeAFromB(msg.pokers || [], tmp);
                    var planeLen = len / 4;
                    if (planeLen <= tmp.length) {
                        var singles = getAllSingle(tmp);
                        if (planeLen <= singles.length) {
                            var si = [];
                            for (var _a = 0, singles_1 = singles; _a < singles_1.length; _a++) {
                                var s = singles_1[_a];
                                if (planeLen >= si.length) {
                                    si = si.concat(s.pokers || []);
                                }
                            }
                            res.push(isPlane1((msg.pokers || []).concat(si)));
                        }
                    }
                }
            }
        }
        return res;
    }
    landlords.getAllPlane1 = getAllPlane1;
    /**
     * 获取所有指定长度的飞机双
     * @param len
     * @param pokers
     */
    function getAllPlane2(len, pokers) {
        var res = [];
        var pLen = pokers.length;
        if (10 <= len && 0 === len % 5 && len <= pLen) {
            var straight3 = getAllStraight3(len, pokers);
            for (var _i = 0, straight3_2 = straight3; _i < straight3_2.length; _i++) {
                var msg = straight3_2[_i];
                if (msg.yes) {
                    var tmp = [];
                    tmp = tmp.concat(pokers);
                    common.removeAFromB(msg.pokers || [], tmp);
                    var planeLen = len / 5;
                    if (planeLen <= tmp.length) {
                        var twins = getAllTwins(tmp);
                        if (planeLen <= twins.length) {
                            var tw = [];
                            for (var _a = 0, twins_1 = twins; _a < twins_1.length; _a++) {
                                var t = twins_1[_a];
                                if (planeLen >= tw.length) {
                                    tw = tw.concat(t.pokers || []);
                                }
                            }
                            res.push(isPlane2((msg.pokers || []).concat(tw)));
                        }
                    }
                }
            }
        }
        return res;
    }
    landlords.getAllPlane2 = getAllPlane2;
})(landlords || (landlords = {}));
exports.default = landlords;
//# sourceMappingURL=landlordsAlgorithm.js.map