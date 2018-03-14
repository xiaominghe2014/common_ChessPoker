"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("../utils/common");
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
        for (var i = 0 /* SPADE */; i < 4 /* KING */; i++) {
            for (var j = 0 /* v_3 */; j < 13 /* v_king_small */; j++) {
                this.cards.push({ color: i, value: j });
            }
        }
        this.cards.push({ color: 4 /* KING */, value: 13 /* v_king_small */ });
        this.cards.push({ color: 4 /* KING */, value: 14 /* v_king_big */ });
        common.removeAFromB(this.moveCards, this.cards);
    };
    return CardPair;
}());
exports.CardPair = CardPair;
//# sourceMappingURL=Poker.js.map