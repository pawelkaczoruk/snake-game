export class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Rect {
  constructor(x, y, w = 1, h = 1) {
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

export function overlaps(player, obstacle) {
  return player.x + 1 > obstacle.x
         && player.x < obstacle.x + 1
         && player.y + 1 > obstacle.y
         && player.y < obstacle.y + 1;
}