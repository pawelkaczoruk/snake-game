export class Vec {
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