declare namespace mahjong {
    const enum Color {
        CHAR = 0,
        BAMBOO = 1,
        DOT = 2,
        WIND = 3,
        DRAGON = 4,
        FLOWER = 5,
        SEASON = 6,
    }
    const enum Value {
        C1 = 0,
        C2 = 1,
        C3 = 2,
        C4 = 3,
        C5 = 4,
        C6 = 5,
        C7 = 6,
        C8 = 7,
        C9 = 8,
        B1 = 9,
        B2 = 10,
        B3 = 11,
        B4 = 12,
        B5 = 13,
        B6 = 14,
        B7 = 15,
        B8 = 16,
        B9 = 17,
        D1 = 18,
        D2 = 19,
        D3 = 20,
        D4 = 21,
        D5 = 22,
        D6 = 23,
        D7 = 24,
        D8 = 25,
        D9 = 26,
        W_D = 27,
        W_N = 28,
        W_X = 29,
        W_B = 30,
        D_Z = 31,
        D_F = 32,
        D_B = 33,
        F_M = 34,
        F_L = 35,
        F_Z = 36,
        F_J = 37,
        S_C = 38,
        S_X = 39,
        S_Q = 40,
        S_D = 41,
    }
    const totalValueCount: number;
    const MjBits: Value[];
    const ColorOffSet: number[];
    function isValidMjNumber(mj: number): boolean;
    function getColor(mj: number): number;
    interface Mj {
        color: number;
        value: number;
        num: number;
    }
    const MAX_VALUE: number;
    interface ArrMjMsg {
        count: Array<number>;
        mj: Array<Array<Mj>>;
    }
}
