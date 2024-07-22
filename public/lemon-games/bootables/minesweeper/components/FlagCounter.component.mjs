import { Component } from "../../../modules/component.mjs";

import Counter from "./Counter.component.mjs";
import { cellEvents } from "./Cell/index.mjs";

export default Component.define(
  "flag-counter",
  class FlagCounter extends Counter {
    constructor() {
      super();
      this.abortController = new AbortController();
    }
    connectedCallback() {
      this.getRootNode().addEventListener(
        cellEvents.flagToggled,
        (e) => {
          console.log("flag toggled");
          const cell = e.target;
          cell.isFlagged() ? this.decrement() : this.increment();
        },
        { signal: this.abortController.signal }
      );
    }

    disconnectedCallback() {
      this.abortController.abort();
    }
  }
);
