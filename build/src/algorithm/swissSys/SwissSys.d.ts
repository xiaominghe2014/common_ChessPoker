declare namespace SwissSys {
    /**
     * 赛事选手
     */
    class Player {
        serialNumber: number;
        scores: number;
        firstCnt: number;
        byeCnt: number;
        layout: boolean;
    }
    /**
     * 赛事对阵
     */
    class Against {
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
    class CompetitionRotation {
        /**
         * 轮次
         */
        round: number;
        /**
         * 选手对阵列表
         */
        againsts: Array<Against>;
    }
    function layoutFirst(max: number): CompetitionRotation;
    /**
     * 根据之前所有轮次信息，编排下一轮
     * @param allRotations
     * @return {CompetitionRotation}
     */
    function layoutNext(allRotations: Array<CompetitionRotation>, max?: number): CompetitionRotation;
    function searchNextPlayer(s1: number, players: Array<Player>, playerMatched: Map<number, Array<number>>): Player | null;
    function shuffleArray(max: number): number[];
}
export default SwissSys;
