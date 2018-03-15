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
     * 是否是有效的牌值
     */
    function isValidPokerNumber(poker) {
        if (0 > poker)
            return false;
        var card = Algorithm.numberToPoker(poker);
        if (0 > card.color || 0 > card.value)
            return false;
        return 5 /* BACK */ > card.color && 15 /* v_back */ > card.value;
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
            case 2 /* BOMB_KING */:
                return 100;
            case 5 /* BOMB */:
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
                type: 0 /* SINGLE */,
                weight: ws[0],
                repeated: 1
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
                    type: 1 /* TWINS */,
                    weight: ws[0],
                    repeated: 1
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
                        type: 2 /* BOMB_KING */,
                        weight: ws[0],
                        repeated: 1
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
                    type: 3 /* THREE */,
                    weight: ws[0],
                    repeated: 1
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
                    type: 4 /* THREE_BAND_1 */,
                    weight: ws[1],
                    repeated: 1
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
                    type: 5 /* BOMB */,
                    weight: ws[0],
                    repeated: 1
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
                    type: 6 /* THREE_BAND_2 */,
                    weight: ws[2],
                    repeated: 1
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
                    type: 7 /* STRAIGHT_1 */,
                    weight: ws[0],
                    repeated: len
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
                    type: 8 /* STRAIGHT_2 */,
                    weight: ws[0],
                    repeated: len
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
                    type: 9 /* STRAIGHT_3 */,
                    weight: ws[0],
                    repeated: len
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
                    type: 10 /* FOUR_WITH_2 */,
                    weight: ws[2],
                    repeated: 1
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
                        type: 11 /* FOUR_WITH_4 */,
                        weight: ws[indexArr[i][0]],
                        repeated: 1
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
                    type: 12 /* PLANE_WITH_SINGLE */,
                    weight: max,
                    repeated: len / 4
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
                        type: 13 /* PLANE_WITH_TWINS */,
                        weight: max,
                        repeated: len / 5
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
})(landlords = exports.landlords || (exports.landlords = {}));
//# sourceMappingURL=landlordsAlgorithm.js.map