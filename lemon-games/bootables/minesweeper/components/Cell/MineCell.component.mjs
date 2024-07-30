import { Component } from "../../../../modules/Component.mjs";
import AbstractCell from "./AbstractCell.component.mjs";

const style = await Component.fetchStyle(import.meta.url);

export default Component.define(
  "mine-cell",
  class MineCell extends AbstractCell {
    constructor(x, y) {
      super(x, y);
    }

    // LIFECYCLE METHODS
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.appendChild(style.cloneNode(true));
    }

    // METHODS
    _reveal() {
      super._reveal();
      this.classList.add("mine");
      this.dispatchEvent(
        new Event(MineCell.events.exploded, { bubbles: true })
      );
    }

    // EVENTS
    static get events() {
      return { ...super.events, exploded: "lg-mine-exploded" };
    }
  }
);
