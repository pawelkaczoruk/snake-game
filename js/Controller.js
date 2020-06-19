import Player from './Player.js';

export default class Controller {
  constructor(player) {
    this.player = player;

    this.isPaused = true;

    this.createController();
  }

  createController() {
    document.addEventListener('keydown', e => {
      if (this.player.canControl && !this.isPaused) {
        this.player.canControl = false;
    
        if (this.player.speed.y == 0) {
          if (e.code == 'KeyW') this.player.speed.update(0, -1);
          if (e.code == 'KeyS') this.player.speed.update(0, 1);
        }
        if (this.player.speed.x == 0) {
          if (e.code == 'KeyA') this.player.speed.update(-1, 0);
          if (e.code == 'KeyD') this.player.speed.update(1, 0);      
        }      
      }
    });
  }

  pause() {
    this.isPaused = true;
  }

  unpause() {
    this.isPaused = false;
  }
}