import LemonOS from "../bootables/lemon-os/lemon-os.mjs";
import SoundController from "../controllers/SoundController.mjs";
import ButtonController from "../controllers/ButtonController.mjs";
import ScreenController from "../controllers/ScreenController.mjs";
import { Component } from "../modules/component.mjs";
import {
  compose,
  canStaticFetchContent,
  canStaticFetchStyle,
  canStaticRegisterFont,
} from "../mixins/componentMixins.mjs";

class LemonGamesElement extends compose(
  canStaticFetchStyle,
  canStaticFetchContent,
  canStaticRegisterFont
)(HTMLElement) {
  constructor(osConstructor = LemonOS) {
    super();
    this._osConstructor = osConstructor;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(LemonGamesElement.style);
    this.shadowRoot.innerHTML += LemonGamesElement.content;

    this.soundController = new SoundController(this.shadowRoot);
    this.screenController = new ScreenController(
      this.shadowRoot.querySelector("#display")
    );
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
await LemonGamesElement._fetchContent(import.meta.url);
await LemonGamesElement._fetchStyle(import.meta.url);
await LemonGamesElement._registerFont();

export default Component.define("lemon-games", LemonGamesElement);
