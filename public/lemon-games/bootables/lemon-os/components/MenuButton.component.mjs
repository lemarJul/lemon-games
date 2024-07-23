import { Component } from "../../../modules/component.mjs";
import { canLinkLocalStyle } from "../../../mixins/componentMixins.mjs";
import ScreenController from "../../../controllers/ScreenController.mjs";

export default Component.define(
  "menu-button",
  class MenuButton extends canLinkLocalStyle(HTMLElement) {
    constructor({ showScreen } = {}) {
      super();
      showScreen && this.setAttribute("showScreen", showScreen);
    }
    connectedCallback() {
      this.tabIndex = 0;
      this.linkLocalStyle(import.meta.url);
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
      if (!this.hasAttribute("showScreen")) return;
      this.dispatchEvent(ScreenController.Events.showScreen);
    }
  }
);
