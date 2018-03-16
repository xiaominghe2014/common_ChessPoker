"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithm = require("../Algorithm");
var threeGoldenFlower;
(function (threeGoldenFlower) {
    /**
     * 是否是有效的牌值
     */
    function isValidPokerNumber(poker) {
        if (0 > poker)
            return false;
        var card = Algorithm.numberToPoker(poker);
        if (0 > card.color || 0 > card.value)
            return false;
        return 4 /* KING */ > card.color && 13 /* v_king_small */ > card.value;
    }
    threeGoldenFlower.isValidPokerNumber = isValidPokerNumber;
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
    threeGoldenFlower.isValidPokersArray = isValidPokersArray;
    /**
     * 获取单张扑克大小
     * @param poker
     */
    function getPokerWeight(poker) {
        var card = Algorithm.numberToPoker(poker);
        return (card.value + 1) % (12 /* v_2 */ + 1);
    }
    threeGoldenFlower.getPokerWeight = getPokerWeight;
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
    threeGoldenFlower.getPokersWeight = getPokersWeight;
    /**
     * 获取扑克类型权值
     */
    function getPokerTypeWeight(type) {
        return type;
    }
    threeGoldenFlower.getPokerTypeWeight = getPokerTypeWeight;
    /**
     * 数组转扑克组
     */
    function pokersToCards(pokers) {
        var cards = [];
        for (var _i = 0, pokers_3 = pokers; _i < pokers_3.length; _i++) {
            var e = pokers_3[_i];
            cards.push(Algorithm.numberToPoker(e));
        }
        return cards;
    }
    threeGoldenFlower.pokersToCards = pokersToCards;
    /**-----------------------------------
     *
     *   牌型判断函数  begin
     * -----------------------------------
     */
    /**
     * 是否为豹子
     */
    function isBomb(pokers) {
        var ws = getPokersWeight(pokers);
        ws.sort();
        if (ws[0] === ws[2])
            return {
                yes: true,
                type: 5 /* BOMB */,
                weight: ws[0]
            };
        return {
            yes: false
        };
    }
    threeGoldenFlower.isBomb = isBomb;
    /**
     * 是否为同花顺
     */
    function isSameColorStraight(pokers) {
        var sameColor = isSameColor(pokers);
        var staright = isStraight(pokers);
        if (sameColor.yes && staright.yes) {
            return {
                yes: true,
                type: 4 /* SAME_COLOR_STRAIGHT */,
                weight: staright.weight
            };
        }
        return {
            yes: false
        };
    }
    threeGoldenFlower.isSameColorStraight = isSameColorStraight;
    /**
     * 是否为同花
     */
    function isSameColor(pokers) {
        var cards = pokersToCards(pokers);
        for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
            var card = cards_1[_i];
            if (card.color !== cards[0].color) {
                return {
                    yes: false
                };
            }
        }
        var ws = getPokersWeight(pokers);
        ws.sort();
        return {
            yes: true,
            type: 3 /* SAME_COLOR */,
            weight: ws[0]
        };
    }
    threeGoldenFlower.isSameColor = isSameColor;
    /**
     * 是否为顺子
     */
    function isStraight(pokers) {
        var ws = getPokersWeight(pokers);
        ws.sort();
        if (ws[0] + 2 === ws[1] + 1 && ws[0] + 2 == ws[2]) {
            return {
                yes: true,
                type: 2 /* STRAIGHT */,
                weight: ws[2]
            };
        }
        var cards = pokersToCards(pokers);
        cards.sort(function (a, b) {
            return a.value - b.value;
        });
        if (0 /* v_3 */ === cards[0].value
            && 11 /* v_A */ === cards[1].value
            && 12 /* v_2 */ === cards[2].value) {
            return {
                yes: true,
                type: 2 /* STRAIGHT */,
                weight: ws[1]
            };
        }
        return {
            yes: false
        };
    }
    threeGoldenFlower.isStraight = isStraight;
    /**
     * 是否为对子
     */
    function isTwins(pokers) {
        var ws = getPokersWeight(pokers);
        ws.sort();
        if (ws[0] === ws[1] || ws[1] === ws[2])
            return {
                yes: true,
                type: 1 /* TWINS */,
                weight: ws[1]
            };
        return {
            yes: false
        };
    }
    threeGoldenFlower.isTwins = isTwins;
    /**
     * 是否为异色2,3,5
     */
    function is235(pokers) {
        var cards = pokersToCards(pokers);
        cards.sort(function (a, b) {
            return a.value - b.value;
        });
        if (0 /* v_3 */ === cards[0].value
            && 2 /* v_5 */ === cards[1].value
            && 12 /* v_2 */ === cards[2].value
            && cards[0].color != cards[1].color
            && cards[0].color != cards[2].color
            && cards[1].color != cards[2].color) {
            return {
                yes: true
            };
        }
        return {
            yes: false
        };
    }
    threeGoldenFlower.is235 = is235;
})(threeGoldenFlower || (threeGoldenFlower = {}));
exports.default = threeGoldenFlower;
//# sourceMappingURL=threeGoldenFlowerAlgorithm.js.map