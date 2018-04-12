"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("../utils/common");
var MJ = require("../model/mahjong");
/// <reference path='../model/mahjong.ts'/>
var mahjong;
(function (mahjong) {
    /**-----------------------
     *  麻将相关算法
     *------------------------
     */
    function numberToMj(mj, isOffSet) {
        if (isOffSet === void 0) { isOffSet = true; }
        if (MJ.isValidMjNumber(mj)) {
            var color = MJ.getColor(mj);
            var value = mj - MJ.MjBits[color]
                + (isOffSet ? MJ.ColorOffSet[color] : 0);
            return {
                color: color,
                value: value,
                num: mj
            };
        }
        return {
            color: -1,
            value: -1,
            num: mj
        };
    }
    mahjong.numberToMj = numberToMj;
    function arrToMj(arr, isOffSet) {
        if (isOffSet === void 0) { isOffSet = true; }
        var res = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var mj = arr_1[_i];
            res.push(numberToMj(mj, isOffSet));
        }
        return res;
    }
    mahjong.arrToMj = arrToMj;
    function arrMjMessage(arr) {
        var msg = { count: [], mj: [] };
        for (var i = 0; i < MJ.MAX_VALUE; i++) {
            msg.count.push(0);
            msg.mj.push([]);
        }
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var mj = arr_2[_i];
            msg.count[mj.value]++;
            msg.mj[mj.value].push(mj);
        }
        return msg;
    }
    mahjong.arrMjMessage = arrMjMessage;
    //所有去掉将牌的牌
    function removeTwins(arrN) {
        var res = [];
        var msg = arrMjMessage(arrToMj(arrN));
        for (var _i = 0, _a = msg.count; _i < _a.length; _i++) {
            var i = _a[_i];
            if (msg.count[i] >= 2) {
                var r = [].concat(arrN);
                common.removeAFromB([msg.mj[i][0].num, msg.mj[i][1].num], r);
                if (r.length)
                    res.push(r);
            }
        }
        return res;
    }
    mahjong.removeTwins = removeTwins;
    //所有去掉刻子的牌
    function removeSame3(arrN) {
        var res = [];
        var msg = arrMjMessage(arrToMj(arrN));
        for (var _i = 0, _a = msg.count; _i < _a.length; _i++) {
            var i = _a[_i];
            if (msg.count[i] >= 3) {
                var r = [].concat(arrN);
                common.removeAFromB([msg.mj[i][0].num, msg.mj[i][1].num, msg.mj[i][2].num], r);
                if (r.length)
                    res.push(r);
            }
        }
        return res;
    }
    mahjong.removeSame3 = removeSame3;
    //所有去掉顺子的牌
    function removeStraight(arrN) {
        var res = [];
        var msg = arrMjMessage(arrToMj(arrN));
        for (var i = 0; i < 9 - 2; i++) {
            if (msg.count[i] && msg.count[i + 1] && msg.count[i + 2]) {
                var r = [].concat(arrN);
                common.removeAFromB([msg.mj[i][0].num, msg.mj[i + 1][0].num, msg.mj[i + 2][0].num], r);
                if (r.length)
                    res.push(r);
            }
        }
        return res;
    }
    mahjong.removeStraight = removeStraight;
    //麻将通用胡发判断
    function normalHu(arrN) {
        var tmp = [].concat(arrN);
        var len = tmp.length;
        if (14 === len) {
            tmp.sort();
            var allNotTwin = removeTwins(arrN);
            var t = [].concat(allNotTwin);
            if (0 == allNotTwin.length)
                return false;
            //去掉刻子\顺子
            for (var _i = 0, allNotTwin_1 = allNotTwin; _i < allNotTwin_1.length; _i++) {
                var r = allNotTwin_1[_i];
                var allNotSame3 = removeSame3(r);
                if (0 == allNotSame3.length)
                    return false;
                for (var _a = 0, allNotSame3_1 = allNotSame3; _a < allNotSame3_1.length; _a++) {
                    var r_1 = allNotSame3_1[_a];
                    var allStraight = removeStraight(r_1);
                    return 0 === r_1.length;
                }
            }
            //去掉顺子\刻子
            for (var _b = 0, t_1 = t; _b < t_1.length; _b++) {
                var r = t_1[_b];
                var allStraight = removeSame3(r);
                if (0 == allStraight.length)
                    return false;
                for (var _c = 0, allStraight_1 = allStraight; _c < allStraight_1.length; _c++) {
                    var r_2 = allStraight_1[_c];
                    var allNotSame3 = removeStraight(r_2);
                    return 0 === r_2.length;
                }
            }
        }
        return false;
    }
    mahjong.normalHu = normalHu;
})(mahjong || (mahjong = {}));
//# sourceMappingURL=NormalMj.js.map