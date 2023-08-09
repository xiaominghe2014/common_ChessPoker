
namespace SwissSys {
    /**
     * 赛事选手
     */
    export class Player {
        //赛事选手编号
        serialNumber: number;
        //赛事选手总积分
        scores: number;
        //赛事选手总先手次数
        firstCnt: number;
        //赛事选手轮空次数
        byeCnt: number;
        //是否已被编排
        layout: boolean;
    }

    /**
     * 赛事对阵
     */
    export class Against {
        /**
         * 先手
         */
        first: Player;
        /**
         * 后手
         */
        second: Player;

        /**
         * 是否为轮空
         */
        bye: boolean;
    }

    /**
     * 赛事轮次
     */
    export class CompetitionRotation {
        /**
         * 轮次
         */
        round: number;
        /**
         * 选手对阵列表
         */
        againsts: Array<Against>;
    }

    export function layoutFirst(max: number): CompetitionRotation {
        let nextRotation = new CompetitionRotation();
        let round = 1;
        // 创建空数组用于存储下一轮的选手对阵列表
        let againsts: Array<Against> = [];
        // 所有玩家信息
        let players: Array<Player> = [];
        // 第一轮,随机编排
        let arr = shuffleArray(max);
        for (let i = 0; i < max; i++) {
            let player = new Player();
            player.serialNumber = arr[i] + 1;
            player.scores = 0;
            player.firstCnt = 0;
            player.layout = true;
            player.byeCnt = 0;
            players.push(player);
        }
        for (let i = 0; i < max; i += 2) {
            let against = new Against();
            against.first = players[i];
            if (i + 1 < max) {
                against.second = players[i + 1];
                against.bye = false;
            } else {
                against.first.byeCnt += 1;
                against.bye = true;
            }
            against.first.firstCnt = 1;
            againsts.push(against);
        }
        nextRotation.round = round;
        nextRotation.againsts = againsts;
        return nextRotation;
    }

    /**
     * 根据之前所有轮次信息，编排下一轮
     * @param allRotations 
     * @return {CompetitionRotation}
     */
    export function layoutNext(allRotations: Array<CompetitionRotation>, max: number = 0): CompetitionRotation {
        let nextRotation = new CompetitionRotation();
        // 确定下一轮的轮次数
        let round = allRotations.length + 1;
        if (round == 1) {
            return layoutFirst(max);
        }
        // 创建空数组用于存储下一轮的选手对阵列表
        let againsts: Array<Against> = [];
        // 所有玩家信息
        let players: Array<Player> = [];
        // 所有玩家已匹配过的玩家列表
        let playerMatched: Map<number, Array<number>> = new Map();

        for (let rotation of allRotations) {
            for (let against of rotation.againsts) {
                if (against.bye) {
                    if (rotation.round == round - 1) {
                        against.first.layout = false;
                        players.push(against.first);
                    }
                    continue;
                }
                let s1 = against.first.serialNumber;
                let s2 = against.second.serialNumber;
                if (playerMatched.get(s1)) {
                    playerMatched.get(s1)?.push(s2);
                } else {
                    playerMatched.set(s1, [s2])
                }
                if (playerMatched.get(s2)) {
                    playerMatched.get(s2)?.push(s1);
                } else {
                    playerMatched.set(s2, [s1])
                }
                if (rotation.round == round - 1) {
                    //取出前一轮所有玩家信息
                    against.first.layout = false;
                    against.second.layout = false;
                    players.push(against.first);
                    players.push(against.second);
                }
            }
        }

        //如果考虑同分情况下轮空的情况，轮空次数从大到小排列
        players.sort((a, b) => b.byeCnt - a.byeCnt);
        // 根据scores从大到小排序选手列表
        players.sort((a, b) => b.scores - a.scores);

        let byeSerialNumber = []

        for (let player of players) {
            if (!player.layout) {
                player.layout = true;
                let s1 = player.serialNumber
                let nextPlayer = searchNextPlayer(s1, players, playerMatched);
                let against = new Against()
                if (nextPlayer) {
                    nextPlayer.layout = true;
                    if (player.firstCnt > nextPlayer.firstCnt) {
                        nextPlayer.firstCnt++;
                        against.first = nextPlayer;
                        against.second = player;
                    } else {
                        player.firstCnt++;
                        against.first = player;
                        against.second = nextPlayer;
                    }
                } else {
                    player.byeCnt += 1;
                    against.bye = true;
                    against.first = player;
                    byeSerialNumber.push(player.serialNumber);
                }
                againsts.push(against);
            }
        }
        //检查轮空玩家,是否可以消除轮空状态，并调整
        if(byeSerialNumber.length>1 && byeSerialNumber.length < players.length){
            for(let i = againsts.length-1; i>=0 ; i--){
                let a = againsts[i];
                if(!a.bye){
                    let s1 = a.first.serialNumber
                    let s2 = a.second.serialNumber
                    let s3 = -1;
                    let s4 = -1;
                    //满足条件的任取两个轮空玩家
                    for(let bye of byeSerialNumber){
                        if(!playerMatched.get(s1)?.includes(bye)){
                            s3 = bye;
                            break;
                        }
                    }
                    if(s3!=-1){
                        for(let bye of byeSerialNumber){
                            if(!playerMatched.get(s2)?.includes(bye)){
                                if(bye!=s3){
                                    s4 = bye;
                                    break;
                                }
                            }
                        }
                    }
                    if(s4!=-1){
                        //刚好可以重组 s1 和 s3 ,s2 和 s4
                        //先去除bye对局
                        let newAgainst = [];
                        let against1 = new Against();
                        let against2 = new Against();
                        let p1 = null;
                        let p2 = null;
                        let p3 = null;
                        let p4 = null;
                        for(let old of againsts){
                            let sn = old.first.serialNumber;
                            if(sn==s1){
                                //拆分
                                p1 = old.first;
                                p2 = old.second;
                                newAgainst.push(...[against1,against2]);
                            }else if(sn==s3){
                                p3 = old.first
                            }else if(sn==s4){
                                p4 = old.first;
                            }else{
                                newAgainst.push(old);
                            }
                        }
                        if(p1 && p2 && p3 && p4){
                            if (p1.firstCnt > p3.firstCnt) {
                                p1.firstCnt--;
                                against1.first = p3;
                                against1.second = p1;
                            } else {
                                p3.firstCnt--;
                                against1.first = p1;
                                against1.second = p3;
                            }
                            if (p2.firstCnt > p4.firstCnt) {
                                against2.first = p4;
                                against2.second = p2;
                            } else {
                                p2.firstCnt++;
                                against2.first = p2;
                                against2.second = p4;
                            }
                            againsts = newAgainst;
                        }
                        break
                    }
                }
            }
        }
        // 设置下一轮的轮次数和选手对阵列表
        nextRotation.round = round;
        nextRotation.againsts = againsts;
        return nextRotation;
    }

    export function searchNextPlayer(s1: number, players: Array<Player>, playerMatched: Map<number, Array<number>>): Player | null {
        for (let nextPlayer of players) {
            if (!nextPlayer.layout) {
                let s2 = nextPlayer.serialNumber;
                // 判断选手s1 和 s2 是否相遇过
                let hasMet = false;
                if (playerMatched.get(s1)) {
                    hasMet = playerMatched.get(s1)?.includes(s2) ?? false;
                }
                if (!hasMet) {
                    nextPlayer.layout = true;
                    return nextPlayer;
                }
            }
        }
        return null;
    }

    export function shuffleArray(max: number) {
        let array: Array<number> = [];
        for (let i: number = 0; i < max; i++) {
            array.push(i);
        }
        for (let i: number = max - 1; i >= 0; i--) {
            let randomIndex: number = Math.floor(Math.random() * (i + 1));
            let tmp = array[randomIndex];
            array[randomIndex] = array[i];
            array[i] = tmp;
        }
        return array;
    }

}

export default SwissSys