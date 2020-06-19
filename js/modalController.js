export default function modalController(type, game) {
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