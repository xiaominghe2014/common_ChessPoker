"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取数组元素索引
 */
function getElementIndex(e, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (isAEqualB(e, arr[i])) {
            return i;
        }
    }
    return -1;
}
exports.getElementIndex = getElementIndex;
/**
 * 从数组删除对应元素
 */
function removeElementFromArray(e, arr) {
    var index = getElementIndex(e, arr);
    if (-1 < index)
        return arr.splice(index, 1);
    return null;
}
exports.removeElementFromArray = removeElementFromArray;
/**
 * 从数组B中删除数组A中含有的元素
 */
function removeAFromB(a, b) {
    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var e = a_1[_i];
        removeElementFromArray(e, b);
    }
}
exports.removeAFromB = removeAFromB;
/**
 * 获取类型
 */
function getType(e) {
    var str = Object.prototype.toString.call(e).split(String.fromCharCode(0x20))[1];
    return str.substr(0, str.length - 1);
}
exports.getType = getType;
/**
 * 判断a,b是否相等
 */
function isAEqualB(a, b) {
    var typeA = getType(a);
    var typeB = getType(b);
    if (typeA === typeB) {
        if ('Object' === typeA) {
            if (Object.keys(a).length !== Object.keys(b).length)
                return false;
            for (var attr in a) {
                var t1 = a[attr] instanceof Object;
                var t2 = b[attr] instanceof Object;
                if (t1 && t2) {
                    return isAEqualB(a[attr], b[attr]);
                }
                else if (a[attr] !== b[attr]) {
                    return false;
                }
            }
            return true;
        }
        else
            return a === b;
    }
    return false;
}
exports.isAEqualB = isAEqualB;
/**
 * 获取一个固定长度的原始数组
 */
function getDefaultArray(len, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    return Array(len).slice().map(function (_) { return defaultValue; });
}
exports.getDefaultArray = getDefaultArray;
//# sourceMappingURL=common.js.map