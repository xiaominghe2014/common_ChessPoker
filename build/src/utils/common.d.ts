/**
 * 获取数组元素索引
 */
export declare function getElementIndex<T>(e: T, arr: Array<T>): number;
/**
 * 从数组删除对应元素
 */
export declare function removeElementFromArray<T>(e: T, arr: Array<T>): any;
/**
 * 从数组B中删除数组A中含有的元素
 */
export declare function removeAFromB<T>(a: Array<T>, b: Array<T>): void;
/**
 * 获取类型
 */
export declare function getType(e: any): string;
/**
 * 判断a,b是否相等
 */
export declare function isAEqualB(a: any, b: any): boolean;
/**
 * 获取一个固定长度的原始数组
 */
export declare function getDefaultArray(len: number, defaultValue?: any): Array<any>;
/**
 * 赋值数组
 */
export declare function getCopyArray<T>(arr: Array<T>): Array<T>;
/**
 * range
 * @param len
 * @param start
 */
export declare function range(len: number, start?: any): Array<any>;
/**
 * 尾调用函数专用
 * @param func
 * @param arg
 */
export declare function tailCall(func: any, arg: any): any;
/**
 * 固定元素更改 decorator
 */
export declare function freezed(constructor: Function): void;
