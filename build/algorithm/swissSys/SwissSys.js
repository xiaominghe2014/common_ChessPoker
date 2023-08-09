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
        var _a, _b;
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
            for (var _c = 0, _d = rotation.againsts; _c < _d.length; _c++) {
                var against = _d[_c];
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
        for (var _e = 0, players_1 = players; _e < players_1.length; _e++) {
            var player = players_1[_e];
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
                }
                againsts.push(against);
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