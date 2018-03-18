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


/**
 * 8皇后问题
 */
export function get8Queen(): Array<Array<number>> {
    let result = [] as Array<Array<number>>
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 7; j++) {
            for (let k = 0; k < 6; k++) {
                for (let l = 0; l < 5; l++) {
                    for (let m = 0; m < 4; m++) {
                        for (let n = 0; n < 3; n++) {
                            for (let o = 0; o < 2; o++) {
                                let choice: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7]
                                let index: Array<number> = [i, j, k, l, m, n, o, 0]
                                let res = [] as Array<number>
                                let line0 = [] as Array<number>
                                let line1 = [] as Array<number>
                                let check = (): boolean => {
                                    for (let ll = 0; ll < line0.length; ll++) {
                                        for (let jj = 0; jj < line0.length; jj++) {
                                            if (ll !== jj && (line0[ll] === line0[jj] || line1[ll] === line1[jj])) return false
                                        }
                                    }
                                    return true
                                }
                                while (index.length && check()) {
                                    line0.push(8 - index.length + choice[index[0]])
                                    line1.push(8 - index.length - choice[index[0]])
                                    res.push(choice[index[0]])
                                    choice.splice(index[0], 1)
                                    index.splice(0, 1)
                                    if (8 === res.length && check()) result.push(res)
                                }
                            }

                        }
                    }
                }
            }
        }
    }
    return result
}
