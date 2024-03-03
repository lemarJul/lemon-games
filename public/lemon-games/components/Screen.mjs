import AbstractComponent from "./AbstractComponent.mjs";

export default class Screen extends AbstractComponent {
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
    this.classList.remove(Screen.disabled);
    return this;
  }

  hide() {
    this.classList.add(Screen.disabled);
    return this;
  }
}
customElements.define("lemon-screen", Screen);
