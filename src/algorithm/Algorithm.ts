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
 * n的全排列
 * @param n 
 */
export function ANN(n: number): Array<Array<number>> {
    let arr = common.range(n), buf = [] as Array<number>
    let used = [] as Array<boolean>, res = [] as Array<Array<number>>
    const dfs = (low: number = 0, hight: number = n) => {
        if (low === hight) {
            let r = [] as Array<number>
            for (let i of common.range(n)) {
                r[i] = buf[i]
            }
            res.push(r)
        } else {
            for (let i of common.range(n)) {
                if (!used[i]) {
                    [used[i], buf[low]] = [true, arr[i]]
                    dfs(low + 1, n)
                    used[i] = false
                }
            }
        }
    }
    dfs()
    return res
}


/**
 * 8皇后问题
 */
export function get8Queen(): Array<Array<number>> {
    let result = [] as Array<Array<number>>, a88 = AllN(8);//ANN(8)
    for (let e of a88) {
        let line0 = [] as Array<number>, line1 = [] as Array<number>
        let check = (): boolean => {
            for (let j of common.range(8)) {
                for (let k of common.range(8)) {
                    if (j !== k && (line0[j] === line0[k] || line1[j] === line1[k])) return false
                }
            }
            return true
        }
        for (let i of common.range(8)) {
            [line0[i], line1[i]] = [e[i] + i, e[i] - i]
        }
        if (check()) result.push(e)
    }
    return result
}


export function AllN(n: number, cur: Array<number> = [], res: Array<Array<number>> = []): Array<Array<number>> {
    if (0 === cur.length) {
        for (let i = 0; i < n; i++) {
            cur.push(i)
        }
        res.push(([] as Array<number>).concat(cur))
        return AllN(n, cur, res)
    }
    let next = (): number => {
        //从最后两位开始向前检测降序
        for (let i = n - 1; i > 0; i--) {
            if (cur[i] > cur[i - 1]) return i - 1
        }
        return -1
    }

    let start: number = next()
    if (-1 === start) return res
    let min = cur[start]
    let sets = cur.slice(start)
    let v2Sets = sets.filter((e) => e > min)
    let v2 = -1
    for (let e of v2Sets) {
        if (-1 === v2) v2 = e
        else if (e < v2) v2 = e
    }
    cur[start] = v2
    for (let vIdx = 0; vIdx < sets.length; vIdx++) {
        if (sets[vIdx] === v2) {
            sets.splice(vIdx, 1)
            break
        }
    }
    sets.sort()
    for (let i = start + 1; i < n; i++) {
        cur[i] = sets[i - start - 1]
    }
    res.push(([] as Array<number>).concat(cur))
    return AllN(n, cur, res)
}


/**
 * dfs计算N皇后问题
 */
export function dfsQueen(n: number) {
    let res: Array<Array<number>> = []
    let arr = common.range(n)
    let buf = [] as Array<number>
    let used: Array<boolean> = common.getDefaultArray(n, false)
    let line0: Array<number> = common.getDefaultArray(n, 2 * n)
    let line1: Array<number> = common.getDefaultArray(n, 2 * n)
    let dfs = (low: number = 0, hight: number = n) => {
        if (low === hight) {
            let r = [] as Array<number>
            for (let i of common.range(n)) {
                r[i] = buf[i]
            }
            res.push(r)
        } else {
            for (let i of common.range(n)) {
                let next = true
                for (let e of line0) {
                    if (e == low + arr[i]) next = false
                }
                for (let e of line1) {
                    if (e == low - arr[i]) next = false
                }
                if (!used[i] && next) {
                    used[i] = true, line0[i] = (low + arr[i]), line1[i] = (low - arr[i])
                    buf[low] = arr[i], dfs(low + 1, n)
                    used[i] = false, line0[i] = 2 * n, line1[i] = 2 * n
                }
            }
        }
    }
    dfs()
    return res
}

//排列
export function arrangement<T>(arrN: Array<T>, m: number): Array<Array<T>> {
    let n = arrN.length
    let len = n - m
    let res: Array<Array<T>> = []
    if (0 > len) return res
    let buf = [] as Array<T>
    let used: Array<boolean> = common.getDefaultArray(n, false)
    let dfs = (low: number = 0, hight: number = m) => {
        if (low === hight) {
            let r = [] as Array<T>
            for (let i of common.range(m)) {
                r[i] = buf[i]
            }
            res.push(r)
        } else {
            for (let i of common.range(n)) {
                if (!used[i] ) {
                    used[i] = true
                    buf[low] = arrN[i]
                    dfs(low + 1, hight)
                    used[i] = false
                }
            }
        }
    }
    dfs()
    return res
}
//组合
export function combination<T>(arrN: Array<T>, m: number): Array<Array<T>> {
    let n = arrN.length
    let len = n - m
    let res: Array<Array<T>> = []
    if (0 > len) return res
    if (0 == len) { res.push(([] as Array<T>).concat(arrN)); return res }
    //n,n-1,n-2,...,n-m-1
    let buf = [] as Array<T>
    let used: Array<boolean> = common.getDefaultArray(n, false)
    let first: Array<Array<T>> = common.getDefaultArray(m, [])
    let dfs = (low: number = 0, hight: number = m) => {
        if (low === hight) {
            let r = [] as Array<T>
            for (let i of common.range(m)) {
                r[i] = buf[i]
            }
            res.push(r)
        } else {
            for (let i of common.range(n)) {
                let next = true
                for (let l = 0; l < m && next; l++) {
                    if (l < low) {
                        for (let e of first[l]) {
                            if (e === arrN[i]) {
                                next = false
                                break;
                            }
                        }
                    }
                }
                if (!used[i] && next) {
                    used[i] = true
                    buf[low] = arrN[i]
                    first[low] = first[low].concat(arrN[i])
                    for (let j = low + 1; j < m; j++) {
                        first[j] = []
                    }
                    dfs(low + 1, hight)
                    used[i] = false
                }
            }
        }
    }
    dfs()
    return res
}