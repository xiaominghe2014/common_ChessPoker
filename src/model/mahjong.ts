
namespace mahjong {

    export const enum Color {
        CHAR, //万
        BAMBOO,//条
        DOT,//筒
        WIND,//风
        DRAGON,//中发白
        FLOWER,//梅兰竹菊
        SEASON,//春夏秋冬
    }

    export const enum Value {
        //万
        C1, C2, C3, C4, C5, C6, C7, C8, C9,
        //条
        B1, B2, B3, B4, B5, B6, B7, B8, B9,
        //筒
        D1, D2, D3, D4, D5, D6, D7, D8, D9,
        //风
        W_D, W_N, W_X, W_B,
        //中发白
        D_Z, D_F, D_B,
        //梅兰竹菊
        F_M, F_L, F_Z, F_J,
        //春夏秋冬
        S_C, S_X, S_Q, S_D,
    }
    //值的个数
    export const totalValueCount: number = 42
    //花色范围
    export const MjBits = [Value.C1, Value.B1, Value.D1,
    Value.W_D, Value.D_Z, Value.F_M, Value.S_C]
    //花色偏移
    export const ColorOffSet = [0, 0, 0, 10, 11, 12, 13]

    export function isValidMjNumber(mj: number): boolean {
        return Value.C1 <= mj && Value.S_D >= mj
    }

    export function getColor(mj: number): number {
        if (Value.C1 <= mj && Value.C9 >= mj)
            return Color.CHAR
        if (Value.B1 <= mj && Value.B9 >= mj)
            return Color.BAMBOO
        if (Value.D1 <= mj && Value.D9 >= mj)
            return Color.DOT
        if (Value.W_D <= mj && Value.W_B >= mj)
            return Color.WIND
        if (Value.F_M <= mj && Value.F_J >= mj)
            return Color.FLOWER
        if (Value.S_C <= mj && Value.S_D >= mj)
            return Color.SEASON
        return -1
    }

    export interface Mj {
        color: number,
        value: number,
        num: number
    }

    export const MAX_VALUE: number = 26

    //麻将组信息
    export interface ArrMjMsg {
        count: Array<number>,
        mj: Array<Array<Mj>>
    }
}
