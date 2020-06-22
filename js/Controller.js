export default class Controller {
  constructor(player) {
    this.player = player;

    this.isPaused = true;

    this.createController();
  }

  createController() {
    document.addEventListener('keydown', e => {
      if (!this.isPaused) {
        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.player.queuedSpeed.update(0, -1);
        else if (e.code === 'KeyS' || e.code === 'ArrowDown') this.player.queuedSpeed.update(0, 1);

        else if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.player.queuedSpeed.update(-1, 0);
        else if (e.code === 'KeyD' || e.code === 'ArrowRight') this.player.queuedSpeed.update(1, 0);      
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

export function modalController(type, game) {
  if (type === 'start') {
    game.state = true;
    game.modal.classList.add('hidden');
    game.canvas.classList.remove('paused');
    game.controller.unpause();
    return;
  }

  if (type !== 'pause' && type !== 'restart') return;

  game.state = false;
  game.modal.classList.remove('hidden');
  game.canvas.classList.add('paused');
  game.controller.pause();

  if (type === 'pause') {
    game.startBtn.innerText = 'Resume';
  } else if (type === 'restart') {
    game.startBtn.innerText = 'Play again';
  }
}