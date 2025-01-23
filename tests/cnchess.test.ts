import CnChess from '../src/model/CnChess';

let game = new CnChess.Game();
console.log(game.toString()); // 打印棋盘

let mvs = game.getMoves(7,9);
console.log(mvs); // 打印所有可走棋子