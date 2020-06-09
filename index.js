const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  get l() {
    return this.x;
  }

  set l(value) {
    this.x = value;
  }

  get r() {
    return this.x + this.w;
  }

  set r(value) {
    this.x = value - this.w;
  }

  get b() {
    return this.y;
  }

  set b(value) {
    this.y = value;
  }

  get t() {
    return this.y + this.h;
  }

  set t(value) {
    this.y = value - this.h;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code == 'KeyW') keyControl.W = true;
  if (e.code == 'KeyS') keyControl.S = true;
  if (e.code == 'KeyA') keyControl.A = true;
  if (e.code == 'KeyD') keyControl.D = true;
});

document.addEventListener('keyup', (e) => {
  if (e.code == 'KeyW') keyControl.W = false;
  if (e.code == 'KeyS') keyControl.S = false;
  if (e.code == 'KeyA') keyControl.A = false;
  if (e.code == 'KeyD') keyControl.D = false;
});

let keyControl = {
  W: false,
  S: false,
  A: false,
  D: false,
};
let player = new Rect(0, 0, 32, 32);
const obstacle = new Rect(256, 256, 32, 32);

gameLoop();

function gameLoop() {
  if (keyControl.W && !keyControl.S) player.y -= 4;
  if (keyControl.S && !keyControl.W) player.y += 4;
  if (keyControl.A && !keyControl.D) player.x -= 4;
  if (keyControl.D && !keyControl.A) player.x += 4;

  if (player.x < 0) player.x = 0;
  if (player.x > canvas.width - player.w) player.x = canvas.width - player.w;
  if (player.y < 0) player.y = 0;
  if (player.y > canvas.height - player.h) player.y = canvas.height - player.h;

  if (overlaps(player, obstacle)) console.log('overlaps');

  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'black';
  context.fillRect(player.x, player.y, player.w, player.h);

  context.fillStyle = 'yellow';
  context.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);

  window.requestAnimationFrame(gameLoop);
}

function overlaps(player, obstacle) {
  return player.x + 32 > obstacle.x
         && player.x < obstacle.x + 32
         && player.y + 32 > obstacle.y
         && player.y < obstacle.y + 32;
}


