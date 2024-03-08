import AbstractCustomELement from "./AbstractCustomElement.mjs";

export default class ScreenElement extends AbstractCustomELement {
  constructor({ name, path, content}) {
    super();
    this.id = name;
    this.src = path;
    // this.classList.add("screen");
    this.innerHTML = content;
  }
  static disabled = "disabled-screen";

  connectedCallback() {
    this._linkClassStyleOnce(import.meta.url);
    this._loadInstanceStyle();
  }

  _loadInstanceStyle() {
    const instanceStylePath = this.src.replace(".html", ".css");
    this._linkStyle(instanceStylePath);
  }


  show() {
    this.classList.remove(ScreenElement.disabled);
    return this;
  }

  hide() {
    this.classList.add(ScreenElement.disabled);
    return this;
  }
  static get tag() {
    return "lemon-screen";
  }
}
ScreenElement.defineSelfOnce();
