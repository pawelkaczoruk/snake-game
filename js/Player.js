import { Vec2, Rect, overlaps } from './math.js'
import modalController from './modalController.js';

const SIZE = 32;
const TEXTURES = {
  head: {
    top: new Vec2(2, 1),
    right: new Vec2(1, 1),
    bottom: new Vec2(1, 0),
    left: new Vec2(2, 0),
  },
  body: {
    horizontal: new Vec2(0, 1),
    vertical: new Vec2(0, 2),
  },
  corner: {
    tl: new Vec2(1,2),
    tr: new Vec2(2,2),
    br: new Vec2(4,2),
    bl: new Vec2(3,2),
  },
  tail: {
    top: new Vec2(4, 1),
    right: new Vec2(3, 1),
    bottom: new Vec2(3, 0),
    left: new Vec2(4, 0),
  },
};

export default class Player {
  constructor(scoreBoard, bestScore) {
    this.scoreBoard = scoreBoard;
    this.bestScore = bestScore;
    this.game = undefined;

    this.score = 0;
    this.pos = [];
    this.speed = new Vec2(1, 0);
    this.canControl = true;
    this.deltaTime = 0.4;

    this.controller = null;

    this.reset();
  }

  collide(level) {
    const head = this.pos[0];

    // collistion with walls
    if (head.r - 1 < level.l || head.l + 1 > level.r
        || head.b - 1 < level.t || head.t + 1 > level.b) {
      this.reset(15, 8);
      level.reset();

      modalController('restart', this.game);
    }

    // collistion with snake itself
    for (let i = 1; i < this.pos.length; i++) {
      if (overlaps(head, this.pos[i])) {
        this.reset(15, 8);
        level.reset();

        modalController('restart', this.game);
      }
    }

    // collision with dots
    level.dots.forEach((dot, i) => {
      if (overlaps(head, dot)) {
        this.score++;
        level.dots.splice(i, 1);

        if (this.score === 3) this.deltaTime = 0.3;
        if (this.score === 10) this.deltaTime = 0.22;
        if (this.score === 20) this.deltaTime = 0.15;

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

  reset(x = 14, y = 8) {
    this.pos = [
      new Rect(x, y),
      new Rect(x - 1, y),
      new Rect(x - 2, y),
    ]
    this.speed.update(1, 0);
    if (this.score > Number(this.bestScore.innerText)) this.bestScore.innerText = this.score;
    this.score = 0;
    this.deltaTime = 0.4;
  }

  setGame(game) {
    this.game = game;
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