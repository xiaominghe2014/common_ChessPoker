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
//# sourceMappingURL=Algorithm.js.map