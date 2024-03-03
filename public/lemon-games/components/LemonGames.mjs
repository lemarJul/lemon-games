import LemonOS from "../bootables/lemon-os/lemon-os.mjs";
import SoundController from "../modules/controllers/SoundController.mjs";
import ButtonController from "../modules/controllers/ButtonController.mjs";
import ScreenController from "../modules/controllers/ScreenController.mjs";
import {
  canStaticFetchContent,
  canStaticFetchStyle,
  canStaticRegisterFont,
} from "./ComponentMixins.mjs";

export default class LemonGames extends HTMLElement {
  constructor(osConstructor = LemonOS) {
    super();
    this._osConstructor = osConstructor;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(LemonGames.style);
    this.shadowRoot.innerHTML += LemonGames.content;

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
Object.assign(
  LemonGames,
  canStaticFetchContent,
  canStaticFetchStyle,
  canStaticRegisterFont
);
await LemonGames._fetchContent(import.meta.url);
await LemonGames._fetchStyle(import.meta.url);
await LemonGames._registerFont();
customElements.define("lemon-games", LemonGames);
