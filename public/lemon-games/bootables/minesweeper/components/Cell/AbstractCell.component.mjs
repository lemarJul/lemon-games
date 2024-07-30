import { canLinkLocalStyle } from "../../../../mixins/componentMixins.mjs";
import { Component } from "../../../../modules/Component.mjs";

const style = await Component.fetchStyle(import.meta.url);

export default class AbstractCell extends HTMLElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  // LIFECYCLE METHODS
  connectedCallback() {
    this.attachShadow({ mode: "open" }).appendChild(style.cloneNode(true));
    this.addEventListener("click", this, { once: true });
    this.addEventListener("contextmenu", this);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this);
    this.removeEventListener("contextmenu", this);
  }

  // EVENT LISTENERS
  handleEvent(e) {
    this["on" + e.type.charAt(0).toUpperCase() + e.type.slice(1)](e);
  }

  onClick(e) {
    if (this.isFlagged()) this.#toggleFlagged();
    this._reveal();
    this.removeEventListener("contextmenu", this);
  }

  onContextmenu(e) {
    e.preventDefault();
    this.#toggleFlagged();
  }

  // METHODS
  _reveal() {
    this.classList.add("revealed");
  }

  isFlagged() {
    return this.classList.contains("flagged");
  }

  #toggleFlagged() {
    this.classList.toggle("flagged");
    this.dispatchEvent(
      new Event(AbstractCell.events.flagToggled, { bubbles: true })
    );
  }

  static get events() {
    return { flagToggled: "lg-flag-toggled" };
  }
}
