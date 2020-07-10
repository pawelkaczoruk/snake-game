import { Rect, overlaps, Vec2 } from './math.js'

const SIZE = 32;
const TEXTURES = {
  apple: new Vec2(0, 0),
};

export default class Level extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w / SIZE, h / SIZE);

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
        TEXTURES.apple.x * SIZE, TEXTURES.apple.y * SIZE,
        dot.w * SIZE, dot.h * SIZE,
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
        
        // check if generated dot position is not uder player
        for (let i = 0; i < player.pos.length; i++) {
          const pos = player.pos[i];

          if (overlaps(pos, dot)) {
            dot = undefined;
            break;
          }
        }

        if (!dot) continue; // id dot is undefined go to the next loop

        // check if generated dot position is not under other dots
        for (let i = 0; i < this.dots.length; i++) {
          const el = this.dots[i];

          if (overlaps(el, dot)) {
            dot = undefined;
            break;
          }     
        }
      }
      
      this.dots.push(dot);
    }
  }
}