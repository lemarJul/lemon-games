import ScreenController from "../../../modules/controllers/ScreenController.mjs";
import AbstractComponent from "../../../components/AbstractComponent.mjs";
import {
  canStaticFetchContent,
  canStaticFetchStyle,
} from "../../../components/ComponentMixins.mjs";

export default class MenuButton extends AbstractComponent {
  constructor() {
    super();

    // this.attachShadow({ mode: "open" });
    // this.shadowRoot.appendChild(MenuButton.style);
    // this.shadowRoot.innerHTML += MenuButton.content;
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
// Object.assign(MenuButton, StaticContentFetchable, StaticStyleFetchable);
// await MenuButton._fetchStyle(import.meta.url);
// await MenuButton._fetchContent(import.meta.url);

customElements.define(MenuButton.tag, MenuButton);
