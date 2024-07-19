import Timer from "./Timer.component.mjs";
import Grid from "./Grid/Grid.component.mjs";

export default class MinesweeperTimer extends Timer {
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
MinesweeperTimer.registerAsComponent();