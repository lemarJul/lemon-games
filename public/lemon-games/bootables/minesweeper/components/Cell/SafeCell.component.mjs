import { Component } from "../../../../modules/Component.mjs";
import AbstractCell from "./AbstractCell.component.mjs";

export default Component.define(
  "safe-cell",

  class SafeCell extends AbstractCell {
    #nAdjacentMines;

    constructor(x, y, nAdjacentMines) {
      super(x, y);
      this.#nAdjacentMines = nAdjacentMines;
    }
    get hasAdjacentMines() {
      return this.#nAdjacentMines !== 0;
    }

    _reveal() {
      super._reveal();
      this.classList.add(`near${this.#nAdjacentMines}`);
      this.dispatchEvent(
        new Event(SafeCell.events.revealed, { bubbles: true })
      );
    }

    static get events() {
      return {
        ...super.eventTypes,
        revealed: "lg-safe-cell-revealed",
      };
    }
  },
  { extends: "button" }
);
