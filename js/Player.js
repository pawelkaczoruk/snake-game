import { Vec, Rect } from './math.js'

export default class Player extends Rect {
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
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update(level) {
    this.x += this.speed.x;
    this.y += this.speed.y;

    if (this.l < level.l) this.l = level.l;
    else if (this.r > level.r) this.r = level.r;
    if (this.t < level.t) this.t = level.t;
    else if (this.b > level.b) this.b = level.b;
  }
}