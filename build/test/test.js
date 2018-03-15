"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Poker = require("../model/Poker");
var Algorithm = require("../algorithm/Algorithm");
var log_1 = require("../utils/log");
/// <reference path="../algorithm/landlords/landlordsAlgorithm.ts"/>
var landlordsAlgorithm_1 = require("../algorithm/landlords/landlordsAlgorithm");
function test() {
    var mPair = new Poker.CardPair();
    log_1.qp_log('mPair', mPair);
    var mCards = [];
    mCards = mCards.concat(mPair.cards).concat(mPair.cards);
    log_1.qp_log('mCards', mCards);
    Algorithm.pokerDefaultSort(mCards);
    log_1.qp_log('mCards--pokerDefaultSort', mCards);
    Algorithm.rmArrayRepeat(mCards);
    log_1.qp_log('mCards---rmArrayRepeat', mCards);
    var pokers = landlordsAlgorithm_1.landlords.getPokers();
    log_1.qp_log(pokers);
    landlordsAlgorithm_1.landlords.shufflePokers(pokers);
    log_1.qp_log(pokers);
    var out1 = [];
    for (var i = 0; i < 9; i++) {
        out1.push({ color: 0 /* SPADE */, value: 0 /* v_3 */ + Math.floor(i / 3) });
    }
    log_1.qp_log(out1);
    var msg1 = landlordsAlgorithm_1.landlords.getPokersTypes(Algorithm.pokersToArray(out1));
    log_1.qp_log(msg1);
    var out2 = [];
    for (var i = 0; i < 12; i++) {
        out2.push({ color: 0 /* SPADE */, value: 0 /* v_3 */ + Math.floor(i / 4) });
    }
    log_1.qp_log(out2);
    var msg2 = landlordsAlgorithm_1.landlords.getPokersTypes(Algorithm.pokersToArray(out2));
    log_1.qp_log(msg2);
    var out3 = [];
    for (var i = 0; i < 5; i++) {
        out3.push({ color: 0 /* SPADE */, value: 0 /* v_3 */ });
        out3.push({ color: 2 /* CLUB */, value: 1 /* v_4 */ });
        out3.push({ color: 3 /* DIAMOND */, value: 2 /* v_5 */ });
        out3.push({ color: 1 /* HEART */, value: 3 /* v_6 */ });
    }
    log_1.qp_log(out3);
    var msg3 = landlordsAlgorithm_1.landlords.getPokersTypes(Algorithm.pokersToArray(out3));
    log_1.qp_log(msg3);
    var out4 = [];
    for (var i = 0; i < 3; i++) {
        out4.push({ color: 0 /* SPADE */, value: 0 /* v_3 */ });
        out4.push({ color: 2 /* CLUB */, value: 1 /* v_4 */ });
        out4.push({ color: 3 /* DIAMOND */, value: 2 /* v_5 */ });
        out4.push({ color: 1 /* HEART */, value: 3 /* v_6 */ });
        out4.push({ color: 0 /* SPADE */, value: 4 /* v_7 */ });
        out4.push({ color: 2 /* CLUB */, value: 5 /* v_8 */ });
    }
    out4.push({ color: 0 /* SPADE */, value: 4 /* v_7 */ });
    out4.push({ color: 2 /* CLUB */, value: 5 /* v_8 */ });
    log_1.qp_log(out4);
    var msg4 = landlordsAlgorithm_1.landlords.getPokersTypes(Algorithm.pokersToArray(out4));
    log_1.qp_log(msg4);
}
test();
//# sourceMappingURL=test.js.map