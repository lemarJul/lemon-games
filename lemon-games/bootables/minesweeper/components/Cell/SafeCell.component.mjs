import { Component } from "../../../../modules/Component.mjs";
import AbstractCell from "./AbstractCell.component.mjs";

const style = await Component.fetchStyle(import.meta.url);

export default Component.define(
  "safe-cell",
  class SafeCell extends AbstractCell {
    #nAdjacentMines;

    constructor(x, y, nAdjacentMines) {
      super(x, y);
      this.#nAdjacentMines = nAdjacentMines;
    }

    // LIFECYCLE METHODS
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.appendChild(style.cloneNode(true));
    }

    // GETTERS
    get hasAdjacentMines() {
      return this.#nAdjacentMines !== 0;
    }

    // METHODS
    _reveal() {
      super._reveal();
      this.classList.add(`near${this.#nAdjacentMines}`);
      this.dispatchEvent(
        new Event(SafeCell.events.revealed, { bubbles: true })
      );
    }

    // EVENTS
    static get events() {
      return {
        ...super.eventTypes,
        revealed: "lg-safe-cell-revealed",
      };
    }
  }
);
