import LemonOS from "../../lemon-os/lemon-os.mjs";
await LemonOS.initialize();

export default class LemOnGames extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = LemOnGames.content;
  }

  connectedCallback() {
    this._os = new LemonOS();
    this._registerEventListeners();
  }

  _registerEventListeners() {
    this.querySelector("#power-button").addEventListener(
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

  static async _fetchContent() {
    const path = import.meta.url;
    const HTMLPath = path.replace(/\.mjs$/, ".html");
    this.content = await fetch(HTMLPath).then((response) => response.text());
  }
}
await LemOnGames._fetchContent();
customElements.define("lemon-games", LemOnGames);


