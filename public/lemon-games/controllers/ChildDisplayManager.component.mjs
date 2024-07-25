import { Component } from "../modules/Component.mjs";
import { canLinkLocalStyle } from "../mixins/componentMixins.mjs";

const attributes = {
  visibleChild: "selected-child",
};

export default Component.define(
  "child-display-manager",
  class ChildDisplayManager extends canLinkLocalStyle(HTMLElement) {
    static get observedAttributes() {
      return Object.values(attributes);
    }

    constructor({ selectedChild: childId = null } = {}) {
      super();
      childId && this.display(childId);
      this.linkLocalStyle(import.meta.url);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log({ name, oldValue, newValue });
      if (name === attributes.visibleChild) {
        this.children[oldValue]?.classList.remove(attributes.visibleChild);
        this.children[newValue]?.classList.add(attributes.visibleChild);
      }
    }

    display(childId) {
      this.setAttribute(attributes.visibleChild, childId);
    }

    connectedCallback() {
      this.#registerEventListeners();
    }
    disconnectedCallback() {
      this.#removeEventListeners();
    }

    enable() {
      this.display("lemonos-launch");
    }

    disable() {
      this.display(null);
    }

    static Events = {
      showScreen: new Event("showScreen", { bubbles: true }),
    };

    #registerEventListeners() {
      this.addEventListener("showScreen", (e) => {
        const screenId = e.target.getAttribute("showScreen");
        this.display(screenId);
      });
    }
    #removeEventListeners() {
      this.removeEventListener("showScreen", (e) => {
        const screenId = e.target.getAttribute("showScreen");
        this.display(screenId);
      });
    }
  }
);
