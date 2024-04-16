"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SwissSys;
(function (SwissSys) {
    /**
     * 赛事选手
     */
    var Player = /** @class */ (function () {
        function Player() {
        }
        return Player;
    }());
    SwissSys.Player = Player;
    /**
     * 赛事对阵
     */
    var Against = /** @class */ (function () {
        function Against() {
        }
        return Against;
    }());
    SwissSys.Against = Against;
    /**
     * 赛事轮次
     */
    var CompetitionRotation = /** @class */ (function () {
        function CompetitionRotation() {
        }
        return CompetitionRotation;
    }());
    SwissSys.CompetitionRotation = CompetitionRotation;
    function layoutFirst(max) {
        var nextRotation = new CompetitionRotation();
        var round = 1;
        // 创建空数组用于存储下一轮的选手对阵列表
        var againsts = [];
        // 所有玩家信息
        var players = [];
        // 第一轮,随机编排
        var arr = shuffleArray(max);
        for (var i = 0; i < max; i++) {
            var player = new Player();
            player.serialNumber = arr[i] + 1;
            player.scores = 0;
            player.firstCnt = 0;
            player.layout = true;
            player.byeCnt = 0;
            players.push(player);
        }
        for (var i = 0; i < max; i += 2) {
            var against = new Against();
            against.first = players[i];
            if (i + 1 < max) {
                against.second = players[i + 1];
                against.bye = false;
            }
            else {
                against.first.byeCnt += 1;
                against.bye = true;
            }
            against.first.firstCnt = 1;
            againsts.push(against);
        }
        nextRotation.round = round;
        nextRotation.againsts = againsts;
        return nextRotation;
    }
    SwissSys.layoutFirst = layoutFirst;
    /**
     * 根据之前所有轮次信息，编排下一轮
     * @param allRotations
     * @return {CompetitionRotation}
     */
    function layoutNext(allRotations, max) {
        var _a, _b, _c, _d;
        if (max === void 0) { max = 0; }
        var nextRotation = new CompetitionRotation();
        // 确定下一轮的轮次数
        var round = allRotations.length + 1;
        if (round == 1) {
            return layoutFirst(max);
        }
        // 创建空数组用于存储下一轮的选手对阵列表
        var againsts = [];
        // 所有玩家信息
        var players = [];
        // 所有玩家已匹配过的玩家列表
        var playerMatched = new Map();
        for (var _i = 0, allRotations_1 = allRotations; _i < allRotations_1.length; _i++) {
            var rotation = allRotations_1[_i];
            for (var _e = 0, _f = rotation.againsts; _e < _f.length; _e++) {
                var against = _f[_e];
                if (against.bye) {
                    if (rotation.round == round - 1) {
                        against.first.layout = false;
                        players.push(against.first);
                    }
                    continue;
                }
                var s1 = against.first.serialNumber;
                var s2 = against.second.serialNumber;
                if (playerMatched.get(s1)) {
                    (_a = playerMatched.get(s1)) === null || _a === void 0 ? void 0 : _a.push(s2);
                }
                else {
                    playerMatched.set(s1, [s2]);
                }
                if (playerMatched.get(s2)) {
                    (_b = playerMatched.get(s2)) === null || _b === void 0 ? void 0 : _b.push(s1);
                }
                else {
                    playerMatched.set(s2, [s1]);
                }
                if (rotation.round == round - 1) {
                    //取出前一轮所有玩家信息
                    against.first.layout = false;
                    against.second.layout = false;
                    players.push(against.first);
                    players.push(against.second);
                }
            }
        }
        //如果考虑同分情况下轮空的情况，轮空次数从大到小排列
        players.sort(function (a, b) { return b.byeCnt - a.byeCnt; });
        // 根据scores从大到小排序选手列表
        players.sort(function (a, b) { return b.scores - a.scores; });
        var byeSerialNumber = [];
        for (var _g = 0, players_1 = players; _g < players_1.length; _g++) {
            var player = players_1[_g];
            if (!player.layout) {
                player.layout = true;
                var s1 = player.serialNumber;
                var nextPlayer = searchNextPlayer(s1, players, playerMatched);
                var against = new Against();
                if (nextPlayer) {
                    nextPlayer.layout = true;
                    if (player.firstCnt > nextPlayer.firstCnt) {
                        nextPlayer.firstCnt++;
                        against.first = nextPlayer;
                        against.second = player;
                    }
                    else {
                        player.firstCnt++;
                        against.first = player;
                        against.second = nextPlayer;
                    }
                }
                else {
                    player.byeCnt += 1;
                    against.bye = true;
                    against.first = player;
                    byeSerialNumber.push(player.serialNumber);
                }
                againsts.push(against);
            }
        }
        //检查轮空玩家,是否可以消除轮空状态，并调整
        if (byeSerialNumber.length > 1 && byeSerialNumber.length < players.length) {
            for (var i = againsts.length - 1; i >= 0; i--) {
                var a = againsts[i];
                if (!a.bye) {
                    var s1 = a.first.serialNumber;
                    var s2 = a.second.serialNumber;
                    var s3 = -1;
                    var s4 = -1;
                    //满足条件的任取两个轮空玩家
                    for (var _h = 0, byeSerialNumber_1 = byeSerialNumber; _h < byeSerialNumber_1.length; _h++) {
                        var bye = byeSerialNumber_1[_h];
                        if (!((_c = playerMatched.get(s1)) === null || _c === void 0 ? void 0 : _c.includes(bye))) {
                            s3 = bye;
                            break;
                        }
                    }
                    if (s3 != -1) {
                        for (var _j = 0, byeSerialNumber_2 = byeSerialNumber; _j < byeSerialNumber_2.length; _j++) {
                            var bye = byeSerialNumber_2[_j];
                            if (!((_d = playerMatched.get(s2)) === null || _d === void 0 ? void 0 : _d.includes(bye))) {
                                if (bye != s3) {
                                    s4 = bye;
                                    break;
                                }
                            }
                        }
                    }
                    if (s4 != -1) {
                        //刚好可以重组 s1 和 s3 ,s2 和 s4
                        //先去除bye对局
                        var newAgainst = [];
                        var against1 = new Against();
                        var against2 = new Against();
                        var p1 = null;
                        var p2 = null;
                        var p3 = null;
                        var p4 = null;
                        for (var _k = 0, againsts_1 = againsts; _k < againsts_1.length; _k++) {
                            var old = againsts_1[_k];
                            var sn = old.first.serialNumber;
                            if (sn == s1) {
                                //拆分
                                p1 = old.first;
                                p2 = old.second;
                                newAgainst.push.apply(newAgainst, [against1, against2]);
                            }
                            else if (sn == s3) {
                                p3 = old.first;
                            }
                            else if (sn == s4) {
                                p4 = old.first;
                            }
                            else {
                                newAgainst.push(old);
                            }
                        }
                        if (p1 && p2 && p3 && p4) {
                            if (p1.firstCnt > p3.firstCnt) {
                                p1.firstCnt--;
                                against1.first = p3;
                                against1.second = p1;
                            }
                            else {
                                p3.firstCnt--;
                                against1.first = p1;
                                against1.second = p3;
                            }
                            if (p2.firstCnt > p4.firstCnt) {
                                against2.first = p4;
                                against2.second = p2;
                            }
                            else {
                                p2.firstCnt++;
                                against2.first = p2;
                                against2.second = p4;
                            }
                            againsts = newAgainst;
                        }
                        break;
                    }
                }
            }
        }
        // 设置下一轮的轮次数和选手对阵列表
        nextRotation.round = round;
        nextRotation.againsts = againsts;
        return nextRotation;
    }
    SwissSys.layoutNext = layoutNext;
    function searchNextPlayer(s1, players, playerMatched) {
        var _a, _b;
        for (var _i = 0, players_2 = players; _i < players_2.length; _i++) {
            var nextPlayer = players_2[_i];
            if (!nextPlayer.layout) {
                var s2 = nextPlayer.serialNumber;
                // 判断选手s1 和 s2 是否相遇过
                var hasMet = false;
                if (playerMatched.get(s1)) {
                    hasMet = (_b = (_a = playerMatched.get(s1)) === null || _a === void 0 ? void 0 : _a.includes(s2)) !== null && _b !== void 0 ? _b : false;
                }
                if (!hasMet) {
                    nextPlayer.layout = true;
                    return nextPlayer;
                }
            }
        }
        return null;
    }
    SwissSys.searchNextPlayer = searchNextPlayer;
    function shuffleArray(max) {
        var array = [];
        for (var i = 0; i < max; i++) {
            array.push(i);
        }
        for (var i = max - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var tmp = array[randomIndex];
            array[randomIndex] = array[i];
            array[i] = tmp;
        }
        return array;
    }
    SwissSys.shuffleArray = shuffleArray;
})(SwissSys || (SwissSys = {}));
exports.default = SwissSys;
//# sourceMappingURL=SwissSys.js.map