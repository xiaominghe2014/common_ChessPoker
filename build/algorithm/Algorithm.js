"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                if (!used[i]) {
                    _d = [true, arr[i]], used[i] = _d[0], buf[low] = _d[1];
                    dfs(low + 1, n);
                    used[i] = false;
                }
            }
        }
        var _d;
    };
    dfs();
    return res;
}
exports.ANN = ANN;
/**
 * 8皇后问题
 */
function get8Queen() {
    var result = [];
    var a88 = ANN(8);
    var _loop_1 = function (e) {
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
        for (var _i = 0, _a = common.range(8); _i < _a.length; _i++) {
            var i = _a[_i];
            _b = [e[i] + i, e[i] - i], line0[i] = _b[0], line1[i] = _b[1];
        }
        if (check())
            result.push(e);
        var _b;
    };
    for (var _i = 0, a88_1 = a88; _i < a88_1.length; _i++) {
        var e = a88_1[_i];
        _loop_1(e);
    }
    return result;
}
exports.get8Queen = get8Queen;
//# sourceMappingURL=Algorithm.js.map