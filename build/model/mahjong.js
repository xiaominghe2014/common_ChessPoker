"use strict";
//namespace mahjong {
Object.defineProperty(exports, "__esModule", { value: true });
//值的个数
exports.totalValueCount = 42;
//花色范围
exports.MjBits = [0 /* C1 */, 9 /* B1 */, 18 /* D1 */,
    27 /* W_D */, 31 /* D_Z */, 34 /* F_M */, 38 /* S_C */];
//花色偏移
exports.ColorOffSet = [0, 0, 0, 10, 11, 12, 13];
function isValidMjNumber(mj) {
    return 0 /* C1 */ <= mj && 41 /* S_D */ >= mj;
}
exports.isValidMjNumber = isValidMjNumber;
function getColor(mj) {
    if (0 /* C1 */ <= mj && 8 /* C9 */ >= mj)
        return 0 /* CHAR */;
    if (9 /* B1 */ <= mj && 17 /* B9 */ >= mj)
        return 1 /* BAMBOO */;
    if (18 /* D1 */ <= mj && 26 /* D9 */ >= mj)
        return 2 /* DOT */;
    if (27 /* W_D */ <= mj && 30 /* W_B */ >= mj)
        return 3 /* WIND */;
    if (34 /* F_M */ <= mj && 37 /* F_J */ >= mj)
        return 5 /* FLOWER */;
    if (38 /* S_C */ <= mj && 41 /* S_D */ >= mj)
        return 6 /* SEASON */;
    return -1;
}
exports.getColor = getColor;
exports.MAX_VALUE = 26;
//}
//# sourceMappingURL=mahjong.js.map