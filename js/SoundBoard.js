const PATHS = {
  music: '../audio/music.ogg',
  click: '../audio/click.ogg',
  death: '../audio/death.ogg',
}

export default class SoundBoard {
  constructor() {
    this.music = new Audio(PATHS.music);
    this.click = new Audio(PATHS.click);
    this.death = new Audio(PATHS.death);
    
    this.setup();
  }

  setup() {
    this.music.addEventListener('loadeddata', () => {
      this.music.loop = true;
      this.music.volume = 0.15;
    });
    
    this.click.addEventListener('loadeddata', () => {
      this.click.volume = 0.3;
    });
    
    this.death.addEventListener('loadeddata', () => {
      this.death.volume = 0.1;
    });    
  }
}