import LemonOS from "../lemon-os/lemon-os.mjs";
await LemonOS.initialize();

export default class LemOnGames extends HTMLElement {
  constructor(OS = LemonOS) {
    super();
    this._initPowerButton();
    this.os = new OS();
    // this.togglePower();
  }
  // connectedCallback() {
  //   this.observer = new MutationObserver(this.onContentReady.bind(this));
  //   this.observer.observe(this, { childList: true });

  //   this.content = this.fetchContent().then((html) => {
  //     this.innerHTML = html;
  //   });
  // }

  // onContentReady() {
  //   this.observer.disconnect();
  //   try {
  //     this._initPowerButton();
  //   } catch (e) {
  //     console.error(
  //       "Failed to initialize LemOnGames, LemonOS is not ready",
  //       e
  //     );
  //   }
  // }

  fetchContent() {
    return fetch("lemon-games/index.html").then((response) => response.text());
  }

  _initPowerButton() {
    this.querySelector("#power-button").addEventListener(
      "click",
      this.togglePower.bind(this)
    );
  }

  togglePower() {
    const isRunning = this.toggleAttribute("data-power");

    if (isRunning) {
      this.os.boot();
    } else {
      this.os.shutDown();
    }
  }
}

customElements.define("lemon-games", LemOnGames);
