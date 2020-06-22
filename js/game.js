import Player from './Player.js'
import Level from './Level.js'
import Controller, { modalController } from './Controller.js';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const score = document.getElementById('score');
const bestScore = document.getElementById('best');
const soundBtn = document.getElementById('sound-btn');

const SIZE = 32;

let bgMusic = new Audio('../audio/music.ogg');
let clickSound = new Audio('../audio/click.ogg');
let deathSound = new Audio('../audio/death.ogg');

bgMusic.addEventListener('loadeddata', () => {
  bgMusic.loop = true;
  bgMusic.volume = 0.15;
});

clickSound.addEventListener('loadeddata', () => {
  clickSound.volume = 0.3;
});

deathSound.addEventListener('loadeddata', () => {
  deathSound.volume = 0.1;
});



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
  bgMusic,
  clickSound,
  deathSound,
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
  clickSound.play();
});

canvas.addEventListener('click', () => {
  modalController('pause', game);
  clickSound.play();
});

let muted = false;
soundBtn.addEventListener('click', () => {
  muted = !muted;

  clickSound.muted = !clickSound.muted;
  bgMusic.muted = !bgMusic.muted;
  deathSound.muted = !deathSound.muted;

  if (muted) soundBtn.classList.add('muted');
  else soundBtn.classList.remove('muted');
});