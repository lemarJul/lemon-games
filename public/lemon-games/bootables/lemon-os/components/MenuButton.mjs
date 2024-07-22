import { Component } from "../../../modules/component.mjs";
import { canLinkLocalStyle } from "../../../mixins/componentMixins.mjs";
import ScreenController from "../../../controllers/ScreenController.mjs";

const { css, html } = await Component.fetchHtmlCss(import.meta.url);

export default Component.define(
  "menu-button",
  class extends canLinkLocalStyle(HTMLElement) {
    constructor() {
      super();
    }
    connectedCallback() {
      this.tabIndex = 0;
      this.linkStyle(import.meta.url);
      this.addEventListener("click", this);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this);
    }

    //* EVENT LISTENERS

    handleEvent(event) {
      this[`on${event.type}`](event);
    }
    onclick(e) {
      this.sendToScreen();
    }

    //* METHODS
    sendToScreen() {
      if (!this.hasAttribute("link")) return;
      this.dispatchEvent(ScreenController.Events.showScreen);
    }
  }
);
