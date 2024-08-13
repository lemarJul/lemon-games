import { canLinkLocalStyle } from "../mixins/componentMixins.mjs";
import { Component } from "../modules/Component.mjs";

export default Component.define(
  "lemon-screen",
  class ScreenElement extends canLinkLocalStyle(HTMLElement) {
    static disabled = "disabled-screen";

    constructor(id, content, style, initializerFn) {
      super();
      id && (this.id = id);
      style && this.appendChild(style);
      content && (this.innerHTML += content);
      this._init = initializerFn ?? (() => {});
      this.classList.add("screen");
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
      this._init();
      this.linkLocalStyle(import.meta.url);
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
      this.classList.remove(ScreenElement.disabled);
      return this;
    }

    hide() {
      this.classList.add(ScreenElement.disabled);
      return this;
    }
  }
);
