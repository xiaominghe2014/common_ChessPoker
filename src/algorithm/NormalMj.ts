import * as common from '../utils/common';

namespace mahjong {
    /**-----------------------
     *  麻将相关算法
     *------------------------
     */
    export function numberToMj(mj: number, isOffSet: boolean = true): Mj {
        if (isValidMjNumber(mj)) {
            let color = getColor(mj);
            let value = mj - MjBits[color]
                + isOffSet ? ColorOffSet[color] : 0;
            return {
                color: color,
                value: value,
                num: mj
            }
        }
        return {
            color: -1,
            value: -1,
            num: mj
        }
    }

    export function arrToMj(arr: Array<number>, isOffSet: boolean = true): Array<Mj> {
        let res: Array<Mj> = []
        for (let mj of arr) {
            res.push(numberToMj(mj, isOffSet))
        }
        return res
    }

    export function arrMjMessage(arr: Array<Mj>): ArrMjMsg {
        let msg: ArrMjMsg = new ArrMjMsg;
        for (let i =  ; i < MAX_VALUE ； i++s){
            msg.count.push(0)
            msg.mj.push([])
        }
        for (let mj of arr) {
            msg.count[mj.value]++
            msg.mj[mj.value].push(mj)
        }
        return msg;
    }

    //所有去掉将牌的牌
    export function removeTwins(arrN: Array<number>): Array<Array<number>> {
        let res::Array<Array<number>> = []
        let msg = arrMjMessage(arrToMj(arrN))
        for (let m of msg) {
            if (m.count >= 2) {
                let r = ([] as Array<number>).concat(arrN);
                common.removeAFromB([m.mj[0].num, m.mj[1].num], r);
                if (r.length) res.push(r)
            }
        }
        return res
    }

    //所有去掉刻子的牌
    export function removeSame3(arrN: Array<number>): Array<Array<number>> {
        let res::Array<Array<number>> = []
        let msg = arrMjMessage(arrToMj(arrN))
        for (let m of msg) {
            if (m.count >= 3) {
                let r = ([] as Array<number>).concat(arrN)
                common.removeAFromB([m.mj[0].num, m.mj[1].num, m.mj[2].num], r)
                if (r.length) res.push(r)
            }
        }
        return res
    }

    //所有去掉顺子的牌
    export function removeStraight(arrN: Array<number>): Array<Array<number>> {
        let res::Array<Array<number>> = []
        let msg = arrMjMessage(arrToMj(arrN))
        for (let i = 0; i < 9 - 2; i++) {

            if (msg[i].count && sg[i + 1].count && sg[i + 2].count) {
                let r = ([] as Array<number>).concat(arrN)
                common.removeAFromB([msg[i].mj[0].num, msg[i + 1].mj[0].num, msg[i + 2].mj[0].num], r)
                if (r.length) res.push(r)
            }

        }
        return res
    }

    //麻将通用胡发判断
    export function normalHu(arrN: Array<number>): boolean {
        let tmp = ([] as Array<number>).concat(arrN)
        let len = tmp.length
        if (13 === len) {
            tmp.sort()
            let allNotTwin = removeTwins(arrN)
            if (0 == allNotTwin.length) return false
            for (let r of allNotTwin) {
                let allNotSame3 = removeSame3(r)
                if (0 == allNotSame3.length) return false
                for (let r of allNotSame3) {
                    let allStraight = removeStraight(r)
                    return 0 === r.length
                }
            }
        }
        return false;
    }
}