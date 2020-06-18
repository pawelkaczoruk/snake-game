import Player from './Player.js'
import Level from './Level.js'

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const SIZE = 32;

let player = new Player();
let level = new Level(0, 0, canvas.width / SIZE, canvas.height / SIZE);

let accumulatedTime = 0;
let lastTime = 0;

function gameLoop(time) {
  accumulatedTime += (time - lastTime) / 1000;

  while (accumulatedTime > player.deltaTime) {
    player.update(level);
    level.draw(context);
    player.draw(context);

    accumulatedTime -= player.deltaTime;
  }

  requestAnimationFrame(gameLoop);

  lastTime = time;
}

gameLoop(0);