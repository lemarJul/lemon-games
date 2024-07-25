import Timer from "./Timer.component.mjs";
import Grid from "./Grid/Grid.component.mjs";
import { Component } from "../../../modules/Component.mjs";
import { canLinkLocalStyle } from "../../../mixins/componentMixins.mjs";

export default Component.define(
  "minesweeper-timer",
  class MinesweeperTimer extends Timer {
    static _tagName = "minesweeper-timer";
    abortController = new AbortController();

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
