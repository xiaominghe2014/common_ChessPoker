import * as Poker from '../model/Poker';
export interface ArrayMessage {
    element: any;
    count: number;
}
/**
 * 数组随机排序
 */
export declare function shuffleArray<T>(array: Array<T>): Array<T>;
/**
 * 获取数组元素信息
 */
export declare function getArrayMessage(array: Array<any>): Array<ArrayMessage>;
/**
 * 数组去重
 */
export declare function rmArrayRepeat(arr: Array<any>): void;
/**
 * 单张扑克转数字
 */
export declare function pokerToNumber(poker: Poker.Card): number;
/**
 * 单个数字转扑克
 */
export declare function numberToPoker(poker: number): Poker.Card;
/**
 * 扑克转数组
 */
export declare function pokersToArray(pokers: Array<Poker.Card>): Array<number>;
/**
 * 数组转扑克
 */
export declare function arrayToPokers(pokers: Array<number>): Array<Poker.Card>;
/**
 * 扑克排序
 */
export declare function pokerDefaultSort(pokers: Array<Poker.Card>): Array<Poker.Card>;
/**
 * 描述获取数组内连续元素之和的最大值
 * 算法:以连续元素个数为基数,遍历至 0
 * @param arr
 * @param max
 * @param count
 * @return {number}
 */
export declare function getMaxContinuousSum(arr: Array<number>, max: number, count?: number): number;
/**
 * 有序数组的二分查找
 */
export declare function binarySearch(key: number, arr: Array<number>): number;
/**
 * n的全排列
 * @param n
 */
export declare function ANN(n: number): Array<Array<number>>;
/**
 * 8皇后问题
 */
export declare function get8Queen(): Array<Array<number>>;
export declare function AllN(n: number, cur?: Array<number>, res?: Array<Array<number>>): Array<Array<number>>;
/**
 * dfs计算N皇后问题
 */
export declare function dfsQueen(n: number): number[][];
export declare function arrangement<T>(arrN: Array<T>, m: number): Array<Array<T>>;
export declare function combination<T>(arrN: Array<T>, m: number): Array<Array<T>>;
/**
 * 无限循环队列
 * @param total
 */
export declare function cycleQueue(total: number): IterableIterator<number>;
/**
 * 升序队列
 * @param total /0,1,2,3...,total-1/
 */
export declare function asceQueue(total: number): IterableIterator<number>;
/**
 * 降序队列
 * @param total /total-1,total-2,...,3,2,1,0/
 */
export declare function descQueue(total: number): IterableIterator<number>;
/**
 * 区间序列
 * @param from 起始位
 * @param to 目标位
 * @param step 步长
 */
export declare function rangeIterator(from: number, to: number, step: number): IterableIterator<number>;
/**
 * 区间序列[from,to]
 * @param from 起始位
 * @param to 目标位
 * @param step 步长
 */
export declare function range(from: number, to: number, step?: number): Array<number>;
/**
* @notice 此处暂时只考虑方阵
* 高斯消元解线性方程组
* @param matricLeft
* @param matricRight
* @returns
*/
export declare function gaussSolutions(matricLeft: Array<Array<number>>, matricRight: Array<number>): number[] | null;
