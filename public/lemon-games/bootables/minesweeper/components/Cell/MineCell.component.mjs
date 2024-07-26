import { Component } from "../../../../modules/Component.mjs";
import AbstractCell from "./AbstractCell.component.mjs";

export default Component.define(
  "mine-cell",
  class MineCell extends AbstractCell {
    constructor(x, y) {
      super(x, y);
    }
    connectedCallback() {
      super.connectedCallback();
      this.linkLocalStyle(import.meta.url);
    }

    _reveal() {
      super._reveal();
      this.classList.add("mine");
      this.dispatchEvent(
        new Event(MineCell.events.exploded, { bubbles: true })
      );
    }

    static get events() {
      return { ...super.events, exploded: "lg-mine-exploded" };
    }
  },
  { extends: "button" }
);
