"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("../utils/common");
var mahjong;
(function (mahjong) {
    /**-----------------------
     *  麻将相关算法
     *------------------------
     */
    function numberToMj(mj, isOffSet) {
        if (isOffSet === void 0) { isOffSet = true; }
        if (isValidMjNumber(mj)) {
            var color = getColor(mj);
            var value = mj - MjBits[color]
                + isOffSet ? ColorOffSet[color] : 0;
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
        var msg = new ArrMjMsg;
        for (var i = ; i < MAX_VALUE; )
            ;
        i++;
        s;
        {
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
        var res, Array;
        ;
        [];
        var msg = arrMjMessage(arrToMj(arrN));
        for (var _i = 0, msg_1 = msg; _i < msg_1.length; _i++) {
            var m = msg_1[_i];
            if (m.count >= 2) {
                var r = [].concat(arrN);
                common.removeAFromB([m.mj[0].num, m.mj[1].num], r);
                if (r.length)
                    res.push(r);
            }
        }
        return res;
    }
    mahjong.removeTwins = removeTwins;
    //所有去掉刻子的牌
    function removeSame3(arrN) {
        var res, Array;
        ;
        [];
        var msg = arrMjMessage(arrToMj(arrN));
        for (var _i = 0, msg_2 = msg; _i < msg_2.length; _i++) {
            var m = msg_2[_i];
            if (m.count >= 3) {
                var r = [].concat(arrN);
                common.removeAFromB([m.mj[0].num, m.mj[1].num, m.mj[2].num], r);
                if (r.length)
                    res.push(r);
            }
        }
        return res;
    }
    mahjong.removeSame3 = removeSame3;
    //所有去掉顺子的牌
    function removeStraight(arrN) {
        var res, Array;
        ;
        [];
        var msg = arrMjMessage(arrToMj(arrN));
        for (var i = 0; i < 9 - 2; i++) {
            if (msg[i].count && sg[i + 1].count && sg[i + 2].count) {
                var r = [].concat(arrN);
                common.removeAFromB([msg[i].mj[0].num, msg[i + 1].mj[0].num, msg[i + 2].mj[0].num], r);
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
        if (13 === len) {
            tmp.sort();
            var allNotTwin = removeTwins(arrN);
            if (0 == allNotTwin.length)
                return false;
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
        }
        return false;
    }
    mahjong.normalHu = normalHu;
})(mahjong || (mahjong = {}));
//# sourceMappingURL=NormalMj.js.map