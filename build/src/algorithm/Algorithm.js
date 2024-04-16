"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gaussSolutions = exports.range = exports.rangeIterator = exports.descQueue = exports.asceQueue = exports.cycleQueue = exports.combination = exports.arrangement = exports.dfsQueen = exports.AllN = exports.get8Queen = exports.ANN = exports.binarySearch = exports.getMaxContinuousSum = exports.pokerDefaultSort = exports.arrayToPokers = exports.pokersToArray = exports.numberToPoker = exports.pokerToNumber = exports.rmArrayRepeat = exports.getArrayMessage = exports.shuffleArray = void 0;
var common = require("../utils/common");
/**
 * 数组随机排序
 */
function shuffleArray(array) {
    var len = array.length;
    for (var i = len - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var tmp = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = tmp;
    }
    return array;
}
exports.shuffleArray = shuffleArray;
/**
 * 获取数组元素信息
 */
function getArrayMessage(array) {
    var messageArray = [];
    var tmpArray = [];
    tmpArray = tmpArray.concat(array);
    while (tmpArray.length) {
        var element = tmpArray[0];
        var message = { element: element, count: 0 };
        while (common.removeElementFromArray(tmpArray[0], tmpArray)) {
            message.count++;
        }
        messageArray.push(message);
    }
    return messageArray;
}
exports.getArrayMessage = getArrayMessage;
/**
 * 数组去重
 */
function rmArrayRepeat(arr) {
    var tmpArray = [];
    var len = 0;
    while (len < arr.length) {
        var element = arr[len];
        var index = common.getElementIndex(element, tmpArray);
        if (-1 === index) {
            tmpArray.push(element);
            len++;
        }
        else {
            common.removeElementFromArray(element, arr);
        }
    }
}
exports.rmArrayRepeat = rmArrayRepeat;
/**
 * 单张扑克转数字
 */
function pokerToNumber(poker) {
    return poker.color * 13 + poker.value;
}
exports.pokerToNumber = pokerToNumber;
/**
 * 单个数字转扑克
 */
function numberToPoker(poker) {
    return { color: poker / 13, value: poker % 13 };
}
exports.numberToPoker = numberToPoker;
/**
 * 扑克转数组
 */
function pokersToArray(pokers) {
    var pArr = [];
    for (var _i = 0, pokers_1 = pokers; _i < pokers_1.length; _i++) {
        var e = pokers_1[_i];
        pArr.push(pokerToNumber(e));
    }
    return pArr;
}
exports.pokersToArray = pokersToArray;
/**
 * 数组转扑克
 */
function arrayToPokers(pokers) {
    var pArr = [];
    for (var _i = 0, pokers_2 = pokers; _i < pokers_2.length; _i++) {
        var e = pokers_2[_i];
        pArr.push(numberToPoker(e));
    }
    return pArr;
}
exports.arrayToPokers = arrayToPokers;
/**
 * 扑克排序
 */
function pokerDefaultSort(pokers) {
    pokers.sort(function (a, b) {
        return pokerToNumber(a) - pokerToNumber(b);
    });
    return pokers;
}
exports.pokerDefaultSort = pokerDefaultSort;
/**
 * 描述获取数组内连续元素之和的最大值
 * 算法:以连续元素个数为基数,遍历至 0
 * @param arr
 * @param max
 * @param count
 * @return {number}
 */
function getMaxContinuousSum(arr, max, count) {
    if (count === void 0) { count = arr.length; }
    var total = function (eArr) { return eArr.reduce(function (x, y) { return x + y; }); };
    max = max || total(arr);
    if (count) {
        for (var i = 0; i < arr.length - count + 1; i++) {
            var tmp = total(arr.slice(i, i + count));
            max = tmp > max ? tmp : max;
        }
        return getMaxContinuousSum(arr, max, count - 1);
    }
    return max;
}
exports.getMaxContinuousSum = getMaxContinuousSum;
/**
 * 有序数组的二分查找
 */
function binarySearch(key, arr) {
    var from = 0;
    var to = arr.length - 1;
    while (from <= to) {
        //from,to之间查找
        var mid = from + Math.round((to - from) / 2);
        if (key < arr[mid])
            to = mid - 1;
        else if (key > arr[mid])
            from = mid + 1;
        else
            return mid;
    }
    return -1;
}
exports.binarySearch = binarySearch;
/**
 * n的全排列
 * @param n
 */
function ANN(n) {
    var arr = common.range(n), buf = [];
    var used = [], res = [];
    var dfs = function (low, hight) {
        var _a;
        if (low === void 0) { low = 0; }
        if (hight === void 0) { hight = n; }
        if (low === hight) {
            var r = [];
            for (var _i = 0, _b = common.range(n); _i < _b.length; _i++) {
                var i = _b[_i];
                r[i] = buf[i];
            }
            res.push(r);
        }
        else {
            for (var _c = 0, _d = common.range(n); _c < _d.length; _c++) {
                var i = _d[_c];
                if (!used[i]) {
                    _a = [true, arr[i]], used[i] = _a[0], buf[low] = _a[1];
                    dfs(low + 1, n);
                    used[i] = false;
                }
            }
        }
    };
    dfs();
    return res;
}
exports.ANN = ANN;
/**
 * 8皇后问题
 */
function get8Queen() {
    var result = [], a88 = AllN(8); //ANN(8)
    var _loop_1 = function (e) {
        var _a;
        var line0 = [], line1 = [];
        var check = function () {
            for (var _i = 0, _a = common.range(8); _i < _a.length; _i++) {
                var j = _a[_i];
                for (var _b = 0, _c = common.range(8); _b < _c.length; _b++) {
                    var k = _c[_b];
                    if (j !== k && (line0[j] === line0[k] || line1[j] === line1[k]))
                        return false;
                }
            }
            return true;
        };
        for (var _b = 0, _c = common.range(8); _b < _c.length; _b++) {
            var i = _c[_b];
            _a = [e[i] + i, e[i] - i], line0[i] = _a[0], line1[i] = _a[1];
        }
        if (check())
            result.push(e);
    };
    for (var _i = 0, a88_1 = a88; _i < a88_1.length; _i++) {
        var e = a88_1[_i];
        _loop_1(e);
    }
    return result;
}
exports.get8Queen = get8Queen;
function AllN(n, cur, res) {
    if (cur === void 0) { cur = []; }
    if (res === void 0) { res = []; }
    if (0 === cur.length) {
        for (var i = 0; i < n; i++) {
            cur.push(i);
        }
        res.push([].concat(cur));
        return AllN(n, cur, res);
    }
    var next = function () {
        //从最后两位开始向前检测降序
        for (var i = n - 1; i > 0; i--) {
            if (cur[i] > cur[i - 1])
                return i - 1;
        }
        return -1;
    };
    var start = next();
    if (-1 === start)
        return res;
    var min = cur[start];
    var sets = cur.slice(start);
    var v2Sets = sets.filter(function (e) { return e > min; });
    var v2 = -1;
    for (var _i = 0, v2Sets_1 = v2Sets; _i < v2Sets_1.length; _i++) {
        var e = v2Sets_1[_i];
        if (-1 === v2)
            v2 = e;
        else if (e < v2)
            v2 = e;
    }
    cur[start] = v2;
    for (var vIdx = 0; vIdx < sets.length; vIdx++) {
        if (sets[vIdx] === v2) {
            sets.splice(vIdx, 1);
            break;
        }
    }
    sets.sort();
    for (var i = start + 1; i < n; i++) {
        cur[i] = sets[i - start - 1];
    }
    res.push([].concat(cur));
    return AllN(n, cur, res);
}
exports.AllN = AllN;
/**
 * dfs计算N皇后问题
 */
function dfsQueen(n) {
    var res = [];
    var arr = common.range(n);
    var buf = [];
    var used = common.getDefaultArray(n, false);
    var line0 = common.getDefaultArray(n, 2 * n);
    var line1 = common.getDefaultArray(n, 2 * n);
    var dfs = function (low, hight) {
        if (low === void 0) { low = 0; }
        if (hight === void 0) { hight = n; }
        if (low === hight) {
            var r = [];
            for (var _i = 0, _a = common.range(n); _i < _a.length; _i++) {
                var i = _a[_i];
                r[i] = buf[i];
            }
            res.push(r);
        }
        else {
            for (var _b = 0, _c = common.range(n); _b < _c.length; _b++) {
                var i = _c[_b];
                var next = true;
                for (var _d = 0, line0_1 = line0; _d < line0_1.length; _d++) {
                    var e = line0_1[_d];
                    if (e == low + arr[i])
                        next = false;
                }
                for (var _e = 0, line1_1 = line1; _e < line1_1.length; _e++) {
                    var e = line1_1[_e];
                    if (e == low - arr[i])
                        next = false;
                }
                if (!used[i] && next) {
                    used[i] = true, line0[i] = (low + arr[i]), line1[i] = (low - arr[i]);
                    buf[low] = arr[i], dfs(low + 1, n);
                    used[i] = false, line0[i] = 2 * n, line1[i] = 2 * n;
                }
            }
        }
    };
    dfs();
    return res;
}
exports.dfsQueen = dfsQueen;
//排列
function arrangement(arrN, m) {
    var n = arrN.length;
    var len = n - m;
    var res = [];
    if (0 > len)
        return res;
    var buf = [];
    var used = common.getDefaultArray(n, false);
    var dfs = function (low, hight) {
        if (low === void 0) { low = 0; }
        if (hight === void 0) { hight = m; }
        if (low === hight) {
            var r = [];
            for (var _i = 0, _a = common.range(m); _i < _a.length; _i++) {
                var i = _a[_i];
                r[i] = buf[i];
            }
            res.push(r);
        }
        else {
            for (var _b = 0, _c = common.range(n); _b < _c.length; _b++) {
                var i = _c[_b];
                if (!used[i]) {
                    used[i] = true;
                    buf[low] = arrN[i];
                    dfs(low + 1, hight);
                    used[i] = false;
                }
            }
        }
    };
    dfs();
    return res;
}
exports.arrangement = arrangement;
//组合
function combination(arrN, m) {
    var n = arrN.length;
    var len = n - m;
    var res = [];
    if (0 > len)
        return res;
    if (0 == len) {
        res.push([].concat(arrN));
        return res;
    }
    //n,n-1,n-2,...,n-m-1
    var buf = [];
    var used = common.getDefaultArray(n, false);
    var first = common.getDefaultArray(m, []);
    var dfs = function (low, hight) {
        if (low === void 0) { low = 0; }
        if (hight === void 0) { hight = m; }
        if (low === hight) {
            var r = [];
            for (var _i = 0, _a = common.range(m); _i < _a.length; _i++) {
                var i = _a[_i];
                r[i] = buf[i];
            }
            res.push(r);
        }
        else {
            for (var _b = 0, _c = common.range(n); _b < _c.length; _b++) {
                var i = _c[_b];
                var next = true;
                for (var l = 0; l < m && next; l++) {
                    if (l < low) {
                        for (var _d = 0, _e = first[l]; _d < _e.length; _d++) {
                            var e = _e[_d];
                            if (e === arrN[i]) {
                                next = false;
                                break;
                            }
                        }
                    }
                }
                if (!used[i] && next) {
                    used[i] = true;
                    buf[low] = arrN[i];
                    first[low] = first[low].concat(arrN[i]);
                    for (var j = low + 1; j < m; j++) {
                        first[j] = [];
                    }
                    dfs(low + 1, hight);
                    used[i] = false;
                }
            }
        }
    };
    dfs();
    return res;
}
exports.combination = combination;
/**
 * 无限循环队列
 * @param total
 */
function cycleQueue(total) {
    var queue, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queue = Array(total).fill(0).map(function (v, i) { return v = i; });
                i = 0;
                _a.label = 1;
            case 1: return [4 /*yield*/, queue[i]];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i = (i + 1) % total;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.cycleQueue = cycleQueue;
/**
 * 升序队列
 * @param total /0,1,2,3...,total-1/
 */
function asceQueue(total) {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = total;
                _a.label = 1;
            case 1:
                if (!total--) return [3 /*break*/, 3];
                return [4 /*yield*/, i - total - 1];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
exports.asceQueue = asceQueue;
/**
 * 降序队列
 * @param total /total-1,total-2,...,3,2,1,0/
 */
function descQueue(total) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!total--) return [3 /*break*/, 2];
                return [4 /*yield*/, total];
            case 1:
                _a.sent();
                return [3 /*break*/, 0];
            case 2: return [2 /*return*/];
        }
    });
}
exports.descQueue = descQueue;
/**
 * 区间序列
 * @param from 起始位
 * @param to 目标位
 * @param step 步长
 */
function rangeIterator(from, to, step) {
    var max;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                max = Math.max(from, to);
                if (!(max === from)) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                if (!(from >= to)) return [3 /*break*/, 3];
                return [4 /*yield*/, from];
            case 2:
                _a.sent();
                from -= step;
                return [3 /*break*/, 1];
            case 3: return [3 /*break*/, 6];
            case 4:
                if (!(from <= to)) return [3 /*break*/, 6];
                return [4 /*yield*/, from];
            case 5:
                _a.sent();
                from += step;
                return [3 /*break*/, 4];
            case 6: return [2 /*return*/];
        }
    });
}
exports.rangeIterator = rangeIterator;
/**
 * 区间序列[from,to]
 * @param from 起始位
 * @param to 目标位
 * @param step 步长
 */
function range(from, to, step) {
    if (step === void 0) { step = 1; }
    if (step <= 0) {
        throw Error("步长必须大于0");
    }
    var res = [];
    var iter = rangeIterator(from, to, step);
    var n = iter.next();
    while (!n.done) {
        res.push(n.value);
        n = iter.next();
    }
    return res;
}
exports.range = range;
/**
* @notice 此处暂时只考虑方阵
* 高斯消元解线性方程组
* @param matricLeft
* @param matricRight
* @returns
*/
function gaussSolutions(matricLeft, matricRight) {
    var len = matricLeft.length;
    var resolve = new Array(0);
    for (var i = 0; i < len; i++) {
        //任取第i个元素不为0的行消元
        var diss = -1;
        for (var s = 0; s < len; s++) {
            if (resolve.indexOf(s) == -1 && matricLeft[s][i] != 0) {
                diss = s;
                break;
            }
        }
        if (diss == -1) {
            //非满秩，则无唯一解
            return null;
        }
        resolve.push(diss);
        var coefficient = matricLeft[diss][i];
        //本身系数归一
        if (coefficient != 1) {
            for (var j = 0; j < len; j++) {
                matricLeft[diss][j] /= coefficient;
            }
            matricRight[diss] /= coefficient;
        }
        for (var k = 0; k < len; k++) {
            if (matricLeft[k][i] == 0 || k == diss)
                continue;
            //第k行消元
            var factor = -matricLeft[k][i];
            matricRight[k] += factor * matricRight[diss];
            for (var l = 0; l < len; l++) {
                matricLeft[k][l] += factor * matricLeft[diss][l];
            }
        }
    }
    return resolve.map(function (v) { return v = matricRight[v]; });
}
exports.gaussSolutions = gaussSolutions;
//# sourceMappingURL=Algorithm.js.map