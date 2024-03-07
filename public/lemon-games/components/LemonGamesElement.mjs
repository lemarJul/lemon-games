import LemonOS from "../bootables/lemon-os/lemon-os.mjs";
import SoundController from "../modules/controllers/SoundController.mjs";
import ButtonController from "../modules/controllers/ButtonController.mjs";
import ScreenController from "../modules/controllers/ScreenController.mjs";
import {
  canStaticFetchContent,
  canStaticFetchStyle,
  canStaticRegisterFont,
} from "./ComponentMixins.mjs";

export default class LemonGamesElement extends HTMLElement {
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
Object.assign(
  LemonGamesElement,
  canStaticFetchContent,
  canStaticFetchStyle,
  canStaticRegisterFont
);
await LemonGamesElement._fetchContent(import.meta.url);
await LemonGamesElement._fetchStyle(import.meta.url);
await LemonGamesElement._registerFont();

if (!customElements.get("lemon-games")) {
  customElements.define("lemon-games", LemonGamesElement);
}
