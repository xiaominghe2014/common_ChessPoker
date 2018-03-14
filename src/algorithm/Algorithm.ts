import * as Poker from '../model/Poker';
import * as common from '../utils/common';



export interface ArrayMessage {
    element: any;
    count: number;
}

/**
 * 数组随机排序
 */
export function shuffleArray<T>(array: Array<T>): Array<T> {
    let len: number = array.length;
    for (let i: number = len - 1; i >= 0; i--) {
        let randomIndex: number = Math.floor(Math.random() * (i + 1));
        let tmp: T = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = tmp;
    }
    return array;
}

/**
 * 获取数组元素信息
 */
export function getArrayMessage(array: Array<any>): Array<ArrayMessage> {
    let messageArray: Array<ArrayMessage> = []
    let tmpArray: Array<any> = []
    tmpArray = tmpArray.concat(array)
    while (tmpArray.length) {
        let element: any = tmpArray[0]
        let message: ArrayMessage = { element: element, count: 0 }
        while (common.removeElementFromArray(tmpArray[0], tmpArray)) {
            message.count++
        }
        messageArray.push(message)
    }
    return messageArray
}


/**
 * 数组去重
 */
export function rmArrayRepeat(arr: Array<any>): void {
    let tmpArray: Array<any> = []
    let len: number = 0
    while (len < arr.length) {
        let element: any = arr[len]
        let index = common.getElementIndex(element, tmpArray)
        if (-1 === index) {
            tmpArray.push(element)
            len++
        } else {
            common.removeElementFromArray(element, arr)
        }
    }
}

/**
 * 单张扑克转数字
 */
export function pokerToNumber(poker: Poker.Card): number {
    return poker.color * 13 + poker.value
}

/**
 * 单个数字转扑克
 */
export function numberToPoker(poker: number): Poker.Card {
    return { color: poker / 13, value: poker % 13 }
}

/**
 * 扑克转数组
 */
export function pokersToArray(pokers: Array<Poker.Card>): Array<number> {
    let pArr: Array<number> = []
    for (let e of pokers) {
        pArr.push(pokerToNumber(e))
    }
    return pArr
}
/**
 * 数组转扑克
 */
export function arrayToPokers(pokers: Array<number>): Array<Poker.Card> {
    let pArr: Array<Poker.Card> = []
    for (let e of pokers) {
        pArr.push(numberToPoker(e))
    }
    return pArr
}

/**
 * 扑克排序
 */
export function pokerDefaultSort(pokers: Array<Poker.Card>): Array<Poker.Card> {
    pokers.sort((a, b) => {
        return pokerToNumber(a) - pokerToNumber(b)
    })
    return pokers
}

/**
 * 描述获取数组内连续元素之和的最大值
 * 算法:以连续元素个数为基数,遍历至 0
 * @param arr
 * @param max
 * @param count
 * @return {number}
 */
export function getMaxContinuousSum(arr: Array<number>, max: number, count: number = arr.length): number {
    let total: Function = (eArr: Array<number>): number => eArr.reduce((x, y) => x + y)
    max = max || total(arr)
    if (count) {
        for (let i: number = 0; i < arr.length - count + 1; i++) {
            let tmp: number = total(arr.slice(i, i + count))
            max = tmp > max ? tmp : max
        }
        return getMaxContinuousSum(arr, max, count - 1)
    }
    return max
}

/**
 * 有序数组的二分查找
 */
export function binarySearch(key: number, arr: Array<number>): number {
    let from: number = 0
    let to: number = arr.length - 1
    while (from <= to) {
        //from,to之间查找
        let mid: number = from + Math.round((to - from) / 2)
        if (key < arr[mid]) to = mid - 1
        else if (key > arr[mid]) from = mid + 1
        else return mid
    }
    return -1
}