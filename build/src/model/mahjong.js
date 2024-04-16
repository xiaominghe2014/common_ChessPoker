"use strict";
//namespace mahjong {
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_VALUE = exports.getColor = exports.isValidMjNumber = exports.ColorOffSet = exports.MjBits = exports.totalValueCount = void 0;
//值的个数
exports.totalValueCount = 42;
//花色范围
exports.MjBits = [0 /* Value.C1 */, 9 /* Value.B1 */, 18 /* Value.D1 */,
    27 /* Value.W_D */, 31 /* Value.D_Z */, 34 /* Value.F_M */, 38 /* Value.S_C */];
//花色偏移
exports.ColorOffSet = [0, 0, 0, 10, 11, 12, 13];
function isValidMjNumber(mj) {
    return 0 /* Value.C1 */ <= mj && 41 /* Value.S_D */ >= mj;
}
exports.isValidMjNumber = isValidMjNumber;
function getColor(mj) {
    if (0 /* Value.C1 */ <= mj && 8 /* Value.C9 */ >= mj)
        return 0 /* Color.CHAR */;
    if (9 /* Value.B1 */ <= mj && 17 /* Value.B9 */ >= mj)
        return 1 /* Color.BAMBOO */;
    if (18 /* Value.D1 */ <= mj && 26 /* Value.D9 */ >= mj)
        return 2 /* Color.DOT */;
    if (27 /* Value.W_D */ <= mj && 30 /* Value.W_B */ >= mj)
        return 3 /* Color.WIND */;
    if (34 /* Value.F_M */ <= mj && 37 /* Value.F_J */ >= mj)
        return 5 /* Color.FLOWER */;
    if (38 /* Value.S_C */ <= mj && 41 /* Value.S_D */ >= mj)
        return 6 /* Color.SEASON */;
    return -1;
}
exports.getColor = getColor;
exports.MAX_VALUE = 26;
//}
//# sourceMappingURL=mahjong.js.map