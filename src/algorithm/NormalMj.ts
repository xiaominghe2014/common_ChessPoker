import * as common from '../utils/common';
import * as MJ from '../model/mahjong'
/// <reference path='../model/mahjong.ts'/>

namespace mahjong {
    /**-----------------------
     *  麻将相关算法
     *------------------------
     */
    export function numberToMj(mj: number, isOffSet: boolean = true): MJ.Mj {
        if (MJ.isValidMjNumber(mj)) {
            let color = MJ.getColor(mj);
            let value = mj - MJ.MjBits[color]
                + (isOffSet ? MJ.ColorOffSet[color] : 0);
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

    export function arrToMj(arr: Array<number>, isOffSet: boolean = true): Array<MJ.Mj> {
        let res: Array<MJ.Mj> = []
        for (let mj of arr) {
            res.push(numberToMj(mj, isOffSet))
        }
        return res
    }

    export function arrMjMessage(arr: Array<MJ.Mj>): MJ.ArrMjMsg {
        let msg: MJ.ArrMjMsg = { count: [], mj: [] };
        for (let i = 0; i < MJ.MAX_VALUE; i++) {
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
        let res: Array<Array<number>> = []
        let msg = arrMjMessage(arrToMj(arrN))
        for (let i of msg.count) {
            if (msg.count[i] >= 2) {
                let r = ([] as Array<number>).concat(arrN);
                common.removeAFromB([msg.mj[i][0].num, msg.mj[i][1].num], r);
                if (r.length) res.push(r)
            }
        }
        return res
    }

    //所有去掉刻子的牌
    export function removeSame3(arrN: Array<number>): Array<Array<number>> {
        let res: Array<Array<number>> = []
        let msg = arrMjMessage(arrToMj(arrN))
        for (let i of msg.count) {
            if (msg.count[i] >= 3) {
                let r = ([] as Array<number>).concat(arrN);
                common.removeAFromB([msg.mj[i][0].num, msg.mj[i][1].num, msg.mj[i][2].num], r);
                if (r.length) res.push(r)
            }
        }
        return res
    }

    //所有去掉顺子的牌
    export function removeStraight(arrN: Array<number>): Array<Array<number>> {
        let res: Array<Array<number>> = []
        let msg = arrMjMessage(arrToMj(arrN))
        for (let i = 0; i < 9 - 2; i++) {

            if (msg.count[i] && msg.count[i + 1] && msg.count[i + 2]) {
                let r = ([] as Array<number>).concat(arrN)
                common.removeAFromB([msg.mj[i][0].num, msg.mj[i + 1][0].num, msg.mj[i + 2][0].num], r)
                if (r.length) res.push(r)
            }
        }
        return res
    }

    //麻将普通胡判断
    export function normalHu(arrN: Array<number>): boolean {
        let tmp = ([] as Array<number>).concat(arrN)
        let len = tmp.length
        if (14 === len) {
            tmp.sort()
            let allNotTwin = removeTwins(arrN)
            let t = ([] as Array<Array<number>>).concat(allNotTwin)
            if (0 == allNotTwin.length) return false
            //去掉刻子\顺子
            for (let r of allNotTwin) {
                let rm1 = removeSame3(r)
                if (0 == rm1.length) return false
                for (let r of rm1) {
                    let rm2 = removeStraight(r)
                    if(0 === rm2.length) return true
                }
            }
            //去掉顺子\刻子
            for (let r of allNotTwin) {
                let rm1 = removeStraight(r)
                if (0 == rm1.length) return false
                for (let r of rm1) {
                    let rm2 = removeSame3(r)
                    if(0 === rm2.length) return true
                }
            }
        }
        return false;
    }
}