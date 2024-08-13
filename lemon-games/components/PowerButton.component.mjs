import { Component } from "../modules/Component.mjs";
const style = await Component.fetchStyle(import.meta.url);

export default Component.define(
  "power-button",
  class PowerButton extends HTMLElement {
    #abortController = new AbortController();

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(style);
      // this.prepend(style);
    }

    connectedCallback() {
      this.addEventListener(
        "click",
        () => this.getRootNode().host.togglePower(),
        { signal: this.#abortController.signal }
      );
    }
    disconnectedCallback() {
      this.#abortController.abort();
    }
  }
);
