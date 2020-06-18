import { Rect, overlaps } from './math.js'

const SIZE = 32;

export default class Level extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.dots = [];
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x * SIZE, this.y * SIZE, this.w * SIZE, this.h * SIZE);

    ctx.fillStyle = 'red';
    this.dots.forEach(dot => {
      ctx.fillRect(dot.x * SIZE, dot.y * SIZE, dot.w * SIZE, dot.h * SIZE);
    });
  }

  reset() {
    this.dots = [];
  }

  update(player) {
    if (!this.dots.length || Math.random() > 0.95) {
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