import { Component } from "../../../../modules/Component.mjs";
import Screen from "../../../../components/Screen.component.mjs";

const template = await Component.fetchHtml(import.meta.url);

export default Component.define(
  "paused-screen",
  class extends Screen {
    constructor() {
      super();
      this.appendChild(template.content);

      this.children["resume"].addEventListener("click", () =>
        this.resumeGame()
      );
    }
    resumeGame() {
      this.getRootNode().descendants.display.display("minesweeper-grid");
      this.getRootNode().descendants.timer.run();
    }
  }
);
