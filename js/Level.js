import { Rect, overlaps } from './math.js'

const SIZE = 32;

export default class Level extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.dots = [];
  }

  draw(ctx, spriteSheet) {
    
    // draw background
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x * SIZE, this.y * SIZE, this.w * SIZE, this.h * SIZE);

    ctx.fillStyle = 'rgba(113, 156, 133, 0.1)';
    for (let i = 0; i < 30; i += 2) {
      ctx.fillRect(i * SIZE, this.y * SIZE, SIZE, this.h * SIZE);
    }
    ctx.fillStyle = 'rgba(113, 156, 133, 0.1)';
    for (let i = 0; i < 17; i += 2) {
      ctx.fillRect(this.x * SIZE, i * SIZE, this.w * SIZE, SIZE);
    }

    // draw dots
    this.dots.forEach(dot => {
      ctx.drawImage(spriteSheet, 
        0 * SIZE, 1 * SIZE,
        1 * SIZE, 1 * SIZE,
        dot.x * SIZE, dot.y * SIZE, 
        dot.w * SIZE, dot.h * SIZE);
    });
  }

  reset() {
    this.dots = [];
  }

  update(player) {
    if (this.dots.length < 3 && (!this.dots.length || Math.random() > 0.95)) {
      let dot;

      while (!dot) {
        dot = new Rect(Math.floor(Math.random() * this.w), Math.floor(Math.random() * this.h));
        if (overlaps(player, dot)) dot = undefined;

        this.dots.forEach(el => {
          if (overlaps(el, dot)) dot = undefined;
        });
      }
      
      this.dots.push(dot);
    }
  }
}