import { Vec2, Rect } from './math.js'

const SIZE = 32;

export default class Player {
  constructor(x = 10, y = 8) {
    this.score = 0;
    this.pos = [
      new Rect(x, y),
      new Rect(x - 1, y),
      new Rect(x - 2, y),
      new Rect(x - 3, y),
      new Rect(x - 4, y),
      new Rect(x - 5, y),
    ];

    this.speed = new Vec2(1, 0);
    this.canControl = true;
    this.deltaTime = 0.5;

    addControls(this);
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    
    this.pos.forEach(pos => {
      ctx.fillRect(pos.x * SIZE, pos.y * SIZE, pos.w * SIZE, pos.h * SIZE);
    });
  }

  collide(level) {
    const head = this.pos[0];

    // collistion with walls
    if (head.r - 1 < level.l || head.l + 1 > level.r
        || head.b - 1 < level.t || head.t + 1 > level.b) {
      this.reset();
    }

    // collistion with snake itself
    for (let i = 1; i < this.pos.length; i++) {
      if (overlaps(head, this.pos[i])) this.reset();
    }
  }

  reset(x = 10, y = 8) {
    this.pos = [
      new Rect(x, y),
      new Rect(x - 1, y),
      new Rect(x - 2, y),
    ]
    this.speed.update(1, 0);
  }

  update(level) {
    const head = this.pos[0];
    const x = head.x + this.speed.x;
    const y = head.y + this.speed.y;

    this.pos.unshift(new Rect(x, y));
    this.pos.pop();

    this.collide(level);

    this.canControl = true;
  }
}


function addControls(player) {
  document.addEventListener('keydown', (e) => {
    if (player.canControl) {
      player.canControl = false;

      if (player.speed.y == 0) {
        if (e.code == 'KeyW') player.speed.update(0, -1);
        if (e.code == 'KeyS') player.speed.update(0, 1);
      }
      if (player.speed.x == 0) {
        if (e.code == 'KeyA') player.speed.update(-1, 0);
        if (e.code == 'KeyD') player.speed.update(1, 0);      
      }      
    }
  });
}

function overlaps(player, obstacle) {
  return player.x + 1 > obstacle.x
         && player.x < obstacle.x + 1
         && player.y + 1 > obstacle.y
         && player.y < obstacle.y + 1;
}