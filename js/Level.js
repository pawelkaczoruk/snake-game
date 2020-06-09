import { Rect } from './math.js'

export default class Level extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}