import { Vec2, Rect, overlaps } from './math.js'
import { modalController } from './Controller.js';

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
    this.queuedSpeed = new Vec2(1, 0);
    this.deltaTime = 0.4;

    this.controller = null;

    this.reset();
  }

  collide(level) {
    const head = this.pos[0];

    // collistion with walls
    if (head.r - 1 < level.l || head.l + 1 > level.r
        || head.b - 1 < level.t || head.t + 1 > level.b) {
      this.reset(4, 12, 6);
      level.reset();

      modalController('restart', this.game);
    }

    // collistion with snake itself
    for (let i = 1; i < this.pos.length - 1; i++) {
      if (overlaps(head, this.pos[i])) {
        this.reset(4, 12, 6);
        level.reset();

        modalController('restart', this.game);
      }
    }

    // collision with dots
    level.dots.forEach((dot, i) => {
      if (overlaps(head, dot)) {
        this.game.clickSound.pause();
        this.game.clickSound.play();
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
    for (let i = 1; i < this.pos.length - 1; i++) {
      const body = this.pos[i];
      const bodyTexture = determineSprite(this.pos, i);

      ctx.drawImage(spriteSheet,
        bodyTexture.x * SIZE, bodyTexture.y * SIZE,
        body.w * SIZE, body.h * SIZE,
        body.x * SIZE, body.y * SIZE,
        body.w * SIZE, body.h * SIZE);      
    }

    // snake tail
    const tail = this.pos[this.pos.length - 1];
    const tailTexture = determineSprite(this.pos, this.pos.length - 1);

    ctx.drawImage(spriteSheet,
      tailTexture.x * SIZE, tailTexture.y * SIZE,
      tail.w * SIZE, tail.h * SIZE,
      tail.x * SIZE, tail.y * SIZE,
      tail.w * SIZE, tail.h * SIZE);
    
    // snake head
    const head = this.pos[0];
    const headTexture = determineSprite(this.pos, 0, this.speed)

    ctx.drawImage(spriteSheet,
      headTexture.x * SIZE, headTexture.y * SIZE,
      head.w * SIZE, head.h * SIZE,
      head.x * SIZE, head.y * SIZE,
      head.w * SIZE, head.h * SIZE);
  }

  reset(lenght = 3, x = 11, y = 6) {
    // clear snake position array
    this.pos = [];
    
    // fill snake position array
    for (let i = 0; i < lenght; i++) {
      this.pos.push(new Rect(x - i, y));
    }

    // reset score, speed, deltaTime, apply best score if previous score was bigger
    this.speed.update(1, 0);
    this.queuedSpeed.update(1, 0);
    if (this.score > Number(this.bestScore.innerText)) this.bestScore.innerText = this.score;
    this.score = 0;
    this.deltaTime = 0.4;
  }

  setGame(game) {
    this.game = game;
  }

  update(level) {
    // update speed value 
    if (this.queuedSpeed.y !== -this.speed.y) this.speed.update(0, this.queuedSpeed.y);
    if (this.queuedSpeed.x !== -this.speed.x) this.speed.update(this.queuedSpeed.x , 0);

    const head = this.pos[0];
    const x = head.x + this.speed.x;
    const y = head.y + this.speed.y;

    // update position of snake
    this.pos.unshift(new Rect(x, y));
    this.collide(level);
    this.pos.pop();
    
    // update score
    this.scoreBoard.innerText = this.score;
  }
}

function determineSprite(positions, index, speed = null) {
  // head
  if (index === 0) {
    if (speed.x > 0) return TEXTURES.head.right;
    if (speed.x < 0) return TEXTURES.head.left;
    if (speed.y < 0) return TEXTURES.head.top;
    if (speed.y > 0) return TEXTURES.head.bottom;
  }

  const TARGET = positions[index];
  const PREV = positions[index - 1];

  // tail
  if (!positions[index + 1]) {
    if (TARGET.x < PREV.x) return TEXTURES.tail.left;
    if (TARGET.x > PREV.x) return TEXTURES.tail.right;
    if (TARGET.y < PREV.y) return TEXTURES.tail.top;
    if (TARGET.y > PREV.y) return TEXTURES.tail.bottom;
  }

  const NEXT = positions[index + 1];

  // body
  if (TARGET.x === PREV.x &&
      TARGET.x === NEXT.x) return TEXTURES.body.vertical;
  if (TARGET.y === PREV.y &&
      TARGET.y === NEXT.y) return TEXTURES.body.horizontal;

  // corners
  if (TARGET.y === PREV.y) {
    if (PREV.x > NEXT.x) {
      if (PREV.y > NEXT.y) return TEXTURES.corner.bl;
      if (PREV.y < NEXT.y) return TEXTURES.corner.tl;
    }
    if (PREV.x < NEXT.x) {
      if (PREV.y > NEXT.y) return TEXTURES.corner.br;
      if (PREV.y < NEXT.y) return TEXTURES.corner.tr;
    }
  }

  if (TARGET.x === PREV.x) {
    if (PREV.y > NEXT.y) {
      if (PREV.x > NEXT.x) return TEXTURES.corner.tr;
      if (PREV.x < NEXT.x) return TEXTURES.corner.tl;
    }
    if (PREV.y < NEXT.y) {
      if (PREV.x > NEXT.x) return TEXTURES.corner.br;
      if (PREV.x < NEXT.x) return TEXTURES.corner.bl;
    }
  }

}