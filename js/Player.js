import { Vec2, Rect, overlaps } from './math.js'

const SIZE = 32;

export default class Player {
  constructor(scoreBoard, timeBoard) {
    this.scoreBoard = scoreBoard;
    this.timeBoard = timeBoard;

    this.timer = setTimer(this.timeBoard);

    this.score = 0;
    this.pos = [];
    this.speed = new Vec2(1, 0);
    this.canControl = true;
    this.deltaTime = 0.4;

    this.reset();
    addControls(this);
  }

  collide(level) {
    const head = this.pos[0];

    // collistion with walls
    if (head.r - 1 < level.l || head.l + 1 > level.r
        || head.b - 1 < level.t || head.t + 1 > level.b) {
      this.reset();
      level.reset();
    }

    // collistion with snake itself
    for (let i = 1; i < this.pos.length; i++) {
      if (overlaps(head, this.pos[i])) {
        this.reset();
        level.reset();
      }
    }

    // collision with dots
    level.dots.forEach((dot, i) => {
      if (overlaps(head, dot)) {
        this.score++;
        level.dots.splice(i, 1);

        if (this.score === 3) this.deltaTime = 0.3;
        if (this.score === 10) this.deltaTime = 0.2;
        if (this.score === 20) this.deltaTime = 0.1;

        this.pos.push(new Rect(-100, -100));
      }
    });
  }  

  draw(ctx, spriteSheet) {
    // snake body
    for (let i = 1; i < this.pos.length; i++) {
      ctx.drawImage(spriteSheet,
        0 * SIZE, 0 * SIZE,
        1 * SIZE, 1 * SIZE,
        this.pos[i].x * SIZE, this.pos[i].y * SIZE,
        this.pos[i].w * SIZE, this.pos[i].h * SIZE);      
    }
    
    // snake head
    const head = this.pos[0];
    let deg = 0;

    if (this.speed.y === 0) deg = this.speed.x > 0 ? 0 : 180;
    else deg = this.speed.y > 0 ? 90 : 270;

    ctx.save();
    ctx.translate(head.x * SIZE + head.w * SIZE / 2, head.y * SIZE + head.h * SIZE / 2);
    ctx.rotate(deg * Math.PI/180);
    ctx.translate(-head.w * SIZE / 2, -head.h * SIZE / 2);
    ctx.drawImage(spriteSheet,
      1 * SIZE, 0 * SIZE,
      head.w * SIZE, head.h * SIZE,
      0, 0,
      head.w * SIZE, head.h * SIZE);  
    ctx.restore();
  }

  reset(x = 10, y = 8) {
    this.pos = [
      new Rect(x, y),
      new Rect(x - 1, y),
      new Rect(x - 2, y),
    ]
    this.speed.update(1, 0);
    this.score = 0;
    this.deltaTime = 0.4;
    this.timeBoard.innerText = 0;
  }

  update(level) {
    const head = this.pos[0];
    const x = head.x + this.speed.x;
    const y = head.y + this.speed.y;

    this.pos.unshift(new Rect(x, y));
    this.pos.pop();
    this.collide(level);

    this.scoreBoard.innerText = this.score;

    this.canControl = true;
  }
}


function addControls(player) {
  document.addEventListener('keydown', (e) => {
    if (player.canControl) {
      player.canControl = false;

      if (player.speed.y == 0) {
        if (e.code == 'KeyW') player.speed.update(0, -1);
        if (e.code == 'KeyS') player.speed.update(0, 1);
      }
      if (player.speed.x == 0) {
        if (e.code == 'KeyA') player.speed.update(-1, 0);
        if (e.code == 'KeyD') player.speed.update(1, 0);      
      }      
    }
  });
}

function setTimer(timer) {
  return setInterval(() => {
    timer.innerText = Number(timer.innerText) + 1;
  }, 1000);
}