import { Rect } from './math.js'

const SIZE = 32;

export default class Level extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x * SIZE, this.y * SIZE, this.w * SIZE, this.h * SIZE);
  }
}