"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPair = void 0;
var common = require("utils/common");
/**
 * 一副牌
 */
var CardPair = /** @class */ (function () {
    function CardPair(moveCards) {
        if (moveCards === void 0) { moveCards = []; }
        this.moveCards = moveCards;
        this.initDefaultCards();
    }
    CardPair.prototype.getCards = function () {
        return this.cards;
    };
    CardPair.prototype.initDefaultCards = function () {
        this.cards = [];
        for (var i = 0 /* Color.SPADE */; i < 4 /* Color.KING */; i++) {
            for (var j = 0 /* Value.v_3 */; j < 13 /* Value.v_king_small */; j++) {
                this.cards.push({ color: i, value: j });
            }
        }
        this.cards.push({ color: 4 /* Color.KING */, value: 13 /* Value.v_king_small */ });
        this.cards.push({ color: 4 /* Color.KING */, value: 14 /* Value.v_king_big */ });
        common.removeAFromB(this.moveCards, this.cards);
    };
    return CardPair;
}());
exports.CardPair = CardPair;
//# sourceMappingURL=Poker.js.map