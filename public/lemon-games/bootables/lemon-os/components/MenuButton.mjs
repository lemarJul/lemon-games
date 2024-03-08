import ScreenController from "../../../modules/controllers/ScreenController.mjs";
import AbstractCustomELement from "../../../components/AbstractCustomElement.mjs";
import {
  canStaticFetchContent,
  canStaticFetchStyle,
} from "../../../components/ComponentMixins.mjs";

export default class MenuButton extends AbstractCustomELement {
  constructor() {
    super();
    this._registerEventListeners();
  }
  connectedCallback() {
    this.tabIndex = 0;
    this._linkClassStyleOnce(import.meta.url);
  }

  _registerEventListeners() {
    this.onClick_sendToScreen();
  }

  //* EVENT LISTENERS
  onClick_sendToScreen() {
    this.addEventListener("click", this.sendToScreen.bind(this));
  }
  sendToScreen() {
    if (!this.hasAttribute("link")) return;
    this.dispatchEvent(ScreenController.Events.showScreen);
  }

  static get tag() {
    return "menu-button";
  }
}
MenuButton.defineSelfOnce();
