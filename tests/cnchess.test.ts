import CnChess from '../src/model/CnChess';

let game = new CnChess.Game("rnbaka1nr/7c1/1c2b4/p1p1p1p1p/9/9/P1P1P1P1P/1C2B1NC1/4A4/RNBAK3R b");
console.log(game.toString()); // 打印棋盘

let mvs = game.getMoves(7,0);
console.log(mvs); // 打印所有可走棋子