import AbstractCustomELement from "./AbstractCustomElement.mjs";

export default class ScreenElementNEW extends AbstractCustomELement {
  constructor(name, content, style, script) {
    super();
    this.id = name;
    this.appendChild(style);
    this.innerHTML += content;
    this._dynamizer = script;
  }
  static disabled = "disabled-screen";

  connectedCallback() {
    this._linkClassStyleOnce(import.meta.url);
    this._dynamizer.call(this);
  }

  show() {
    this.classList.remove(ScreenElementNEW.disabled);
    return this;
  }

  hide() {
    this.classList.add(ScreenElementNEW.disabled);
    return this;
  }
  static get tag() {
    return "lemon-screen-new";
  }
}
if (!customElements.get(ScreenElementNEW.tag)) {
  customElements.define(ScreenElementNEW.tag, ScreenElementNEW);
}
