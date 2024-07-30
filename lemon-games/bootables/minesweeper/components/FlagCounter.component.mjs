import { Component } from "../../../modules/Component.mjs";
import Counter from "./Counter.component.mjs";
import { cellEvents } from "./Cell/index.mjs";

const style = Component.parseHTML(`
  <style>
    :host::after {
      content: " mines";
    }
  </style>
`);
// const style = await Component.fetchStyle(import.meta.url);

export default await Component.define(
  "flag-counter",
  class FlagCounter extends Counter {
    abortController = new AbortController();

    connectedCallback() {
      this.shadowRoot.prepend(style);
      this.#registerEvents();
    }

    disconnectedCallback() {
      this.abortController.abort();
    }

    #registerEvents() {
      this.getRootNode().addEventListener(
        cellEvents.flagToggled,
        (e) => {
          // console.log("flag toggled");
          const cell = e.target;
          cell.isFlagged() ? this.decrement() : this.increment();
        },
        { signal: this.abortController.signal }
      );
    }
  }
);
