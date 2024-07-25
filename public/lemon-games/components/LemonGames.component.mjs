import LemonOS from "../bootables/lemon-os/lemon-os.mjs";
import SoundController from "../controllers/SoundController.mjs";
import ButtonController from "../controllers/ButtonController.mjs";
import DescendantsProvider, {
  nextProvider,
} from "../bootables/minesweeper/modules/DescendantsProvider.mjs";
import { Component } from "../modules/Component.mjs";
import {
  compose,
  canStaticFetchContent,
  canStaticFetchStyle,
  canStaticRegisterFont,
} from "../mixins/componentMixins.mjs";

class LemonGames extends compose(
  canStaticFetchStyle,
  canStaticFetchContent,
  canStaticRegisterFont
)(HTMLElement) {
  constructor(osConstructor = LemonOS) {
    super();
    this._osConstructor = osConstructor;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(LemonGames.style);
    this.shadowRoot.innerHTML += LemonGames.content;

    this.shadowRoot.descendants = DescendantsProvider(this.shadowRoot);
    this.soundController = new SoundController(this.shadowRoot);
    this.screenController = this.shadowRoot.querySelector("#display");
    // this.shadowRoot.nextProvider = nextProvider(this.shadowRoot);
    // this.shadowRoot.nextProvider.register({
    //   timer: "minesweeper-timer",
    // });

    this.buttonController = new ButtonController(this.shadowRoot);
    this.buttonController.exposeElements([
      ["#game-container", "gameContainer"],
      ["#power-light", "powerLight"],
      ["#start-button", "startButton"],
      ["#display", "display"],
      ["#power-button", "powerButton"],
      ["#left-button", "leftButton"],
      ["#right-button", "rightButton"],
      ["#primary-button", "primaryButton"],
      ["#secondary-button", "secondaryButton"],
    ]);
  }

  connectedCallback() {
    this._os = new this._osConstructor(this);
    this._registerEventListeners();
  }

  _registerEventListeners() {
    this.buttonController.powerButton.addEventListener(
      "click",
      this.togglePower.bind(this)
    );
  }

  togglePower() {
    const isRunning = this.toggleAttribute("data-power");

    if (isRunning) {
      this._os.boot();
    } else {
      this._os.shutDown();
    }
  }
}
await LemonGames._fetchContent(import.meta.url);
await LemonGames._fetchStyle(import.meta.url);
await LemonGames._registerFont();

export default Component.define("lemon-games", LemonGames);
