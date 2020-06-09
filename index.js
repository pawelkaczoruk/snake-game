const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(x, y) {
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
    return this.y + this.h;
  }

  set b(value) {
    this.y = value - this.h;
  }

  get t() {
    return this.y;
  }

  set t(value) {
    this.y = value;
  }
}

class Level extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  draw(ctx) {
    context.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Player extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.speed = new Vec(0, 0);
    this.deltaTime = 0.5;

    this.addControls();
  }

  addControls() {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'KeyW') this.speed.update(0, -32);
      if (e.code == 'KeyS') this.speed.update(0, 32);
      if (e.code == 'KeyA') this.speed.update(-32, 0);
      if (e.code == 'KeyD') this.speed.update(32, 0);
    });
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x, player.y, player.w, player.h);
  }

  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;

    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - this.w) this.x = canvas.width - this.w;
    if (this.y < 0) this.y = 0;
    if (this.y > canvas.height - this.h) this.y = canvas.height - this.h;
  }
}

let player = new Player(0, 0, 32, 32);
let level = new Level(0, 0, canvas.width, canvas.height)

let accumulatedTime = 0;
let lastTime = 0;

function gameLoop(time) {
  accumulatedTime += (time - lastTime) / 1000;

  while (accumulatedTime > player.deltaTime) {
    player.update();
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

