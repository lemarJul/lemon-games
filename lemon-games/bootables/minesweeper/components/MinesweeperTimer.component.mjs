import Timer from "./Timer.component.mjs";
import Grid from "./Grid/Grid.component.mjs";
import { Component } from "../../../modules/Component.mjs";
import { canLinkLocalStyle } from "../../../mixins/componentMixins.mjs";

export default Component.define(
  "minesweeper-timer",
  class MinesweeperTimer extends canLinkLocalStyle(Timer) {
    static _tagName = "minesweeper-timer";
    abortController = new AbortController();

    constructor() {
      super();
      this.linkLocalStyle(import.meta.url);
    }

    connectedCallback() {
      [
        [Grid.events.started, () => this.run()],
        [Grid.events.stopped, () => this.pause()],
      ].forEach(([event, callback]) => {
        this.getRootNode().addEventListener(event, callback, {
          signal: this.abortController.signal,
        });
      });
    }
    disconnectedCallback() {
      this.abortController.abort();
    }
  }
);
