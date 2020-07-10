import Player from './Player.js'
import Level from './Level.js'
import SoundBoard from './SoundBoard.js'
import Controller from './Controller.js';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const score = document.getElementById('score');
const bestScore = document.getElementById('best');


let player = new Player(score, bestScore);
let level = new Level(0, 0, canvas.width, canvas.height); // 30x17 tiles
let spriteSheet = new Image();
let controller = new Controller(player);
let soundBoard = new SoundBoard();

let game = {
  state: false,
  firstFrame: true,
  canvas,
  controller,
  soundBoard,
  modal: document.getElementById('modal'),
  startBtn: document.getElementById('start'),
  soundBtn: document.getElementById('sound-btn'),
};

player.setGame(game);
controller.createMusicController();


let accumulatedTime = 0;
let lastTime = 0;

function gameLoop(time) {
  accumulatedTime += (time - lastTime) / 1000;

  while (accumulatedTime > player.deltaTime) {
    if (game.state || game.firstFrame) {
      level.update(player);
      player.update(level);
      level.draw(context, spriteSheet);
      player.draw(context, spriteSheet);
      
      game.firstFrame = false;
    }

    accumulatedTime -= player.deltaTime;
  }

  requestAnimationFrame(gameLoop);
  lastTime = time;
}



spriteSheet.addEventListener('load', () => {
  gameLoop(0);
}, false);

spriteSheet.src = '../assets/sprite_sheet.png';