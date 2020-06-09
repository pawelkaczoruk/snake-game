import Player from './Player.js'
import Level from './Level.js'

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let player = new Player(0, 0, 32, 32);
let level = new Level(0, 0, canvas.width, canvas.height)

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

function overlaps(player, obstacle) {
  return player.x + 32 > obstacle.x
         && player.x < obstacle.x + 32
         && player.y + 32 > obstacle.y
         && player.y < obstacle.y + 32;
}


gameLoop(0);