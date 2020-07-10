export default class Controller {
  constructor(player) {
    this.player = player;

    this.isPaused = true;
    this.muted = false;

    this.createController();
  }

  createMusicController() {
    this.player.game.soundBtn.addEventListener('click', () => {
      this.muted = !this.muted;

      this.player.game.soundBoard.click.muted = !this.player.game.soundBoard.click.muted;
      this.player.game.soundBoard.music.muted = !this.player.game.soundBoard.music.muted;
      this.player.game.soundBoard.death.muted = !this.player.game.soundBoard.death.muted;
    
      if (this.muted) this.player.game.soundBtn.classList.add('muted');
      else this.player.game.soundBtn.classList.remove('muted');
    });

    this.player.game.startBtn.addEventListener('click', () => {
      modalController('start', this.player.game);
      this.player.game.soundBoard.click.play();
    });
    
    this.player.game.canvas.addEventListener('click', () => {
      modalController('pause', this.player.game);
      this.player.game.soundBoard.click.play();
    });
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
    game.soundBoard.music.play();
    return;
  }

  if (type !== 'pause' && type !== 'restart') return;

  game.state = false;
  game.modal.classList.remove('hidden');
  game.canvas.classList.add('paused');
  game.controller.pause();
  game.soundBoard.music.pause();

  if (type === 'pause') {
    game.startBtn.innerText = 'Resume';
  } else if (type === 'restart') {
    game.soundBoard.death.play();
    game.startBtn.innerText = 'Play again';
  }
}