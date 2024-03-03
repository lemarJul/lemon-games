import AbstractController from "./AbstractController.mjs";

//TODO implement enable and disable methods
class SoundController extends AbstractController {
  constructor(HTMLElement) {
    super(HTMLElement);
    this.initialize();
  }

  static _rsc = {
    laser: "lemon-games/assets/sounds/8-bit-laser-151672.mp3",
    start: "lemon-games/assets/sounds/beep3-98810.mp3",
    boom: "lemon-games/assets/sounds/bd-8-bits-16-91523.mp3",
  };

  _playAudio(audio) {
    new Audio(audio).play();
  }
  loadSounds(sounds) {
    for (let soundName in sounds) {
      SoundController._rsc[soundName] = sounds[soundName];
    }
  }

  initialize() {
    this.play = {};
    for (let soundName in SoundController._rsc) {
      const sound = SoundController._rsc[soundName];
      this.play[soundName] = () => {
        if (this.isOn) this._playAudio(sound);
      };
    }
    return this;
  }
}

export default SoundController;
