import AbstractCustomELement from "./AbstractCustomElement.mjs";

export default class ScreenElementNEW extends AbstractCustomELement {
  constructor(id, content, style, initializerFn) {
    super();
    this.id = id;
    this.appendChild(style);
    this.innerHTML += content;
    this._init = initializerFn;
  }
  get name() {
    const toCamelCase = (str) => {
      return str.toLowerCase().replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    };
    return toCamelCase(this.id);
  }

  connectedCallback() {
    this._linkClassStyleOnce(import.meta.url);
    this._init();
  }

  onSelfShown(fn) {
    new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true) {
          fn();
        }
      },
      { threshold: [0] }
    ).observe(this);
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
  static disabled = "disabled-screen";
}
ScreenElementNEW.defineSelfOnce();
