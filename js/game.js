import Player from './Player.js'
import Level from './Level.js'
import Controller from './Controller.js';
import modalController from './modalController.js';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const score = document.getElementById('score');
const bestScore = document.getElementById('best');

const SIZE = 32;



let player = new Player(score, bestScore);
let level = new Level(0, 0, canvas.width / SIZE, canvas.height / SIZE); // 30x17 tiles
let spriteSheet = new Image();
let controller = new Controller(player);

let game = {
  state: false,
  firstFrame: true,
  canvas,
  controller,
  modal: document.getElementById('modal'),
  startBtn: document.getElementById('start'),
};

player.setGame(game);

let accumulatedTime = 0;
let lastTime = 0;

function gameLoop(time) {
  accumulatedTime += (time - lastTime) / 1000;

  while (accumulatedTime > player.deltaTime) {
    if (game.state || game.firstFrame) {
      level.update(player);
      level.draw(context, spriteSheet);
      player.update(level);
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

game.startBtn.addEventListener('click', () => {
  modalController('start', game);
});

canvas.addEventListener('click', () => {
  modalController('pause', game);
});