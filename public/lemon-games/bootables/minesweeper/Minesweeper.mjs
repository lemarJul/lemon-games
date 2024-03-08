import AbstractExe from "../AbstractExe.mjs";
import GridElementFactory from "./components/Grid/GridElementFactory.mjs";
import TimerDisplay from "./modules/TimerDisplay.mjs";
import FlagCounter from "./modules/FlagCounter.mjs";
import HTMLElements from "./modules/HtmlElements.mjs";
import ScreenElementFactory from "../../components/ScreenElementFactory.mjs";

import * as screenComponents from "./screens/index.mjs";
console.log(screenComponents);
export default class MineSweeper extends AbstractExe {
  constructor({ screenController, buttonController, soundController }) {
    super({
      name: "MineSweeper",
      screenController,
      buttonController,
      soundController,
    });

    this._renderScreenComponents(screenComponents).then(() => {
      this.HTMLElements = HTMLElements(this.screenController.wrappedElement);
      this.timer = new TimerDisplay(this.HTMLElements.timer);
      this.flagCounter = new FlagCounter(this.HTMLElements.flagCounter);
    });
  }

  newGame() {
    this.started = false;

    console.log(this.screenController.screens);
    const gridScreen = this.screenController.screens.minesweeperGrid;
    const oldGrid = gridScreen.querySelector("square-grid");
    const difficulty = this.HTMLElements.difficulty.value;
    const safeCorners = this.HTMLElements.safeCorners.value === "true";
    const grid = GridElementFactory.createSquareGrid(difficulty, safeCorners);

    gridScreen.replaceChild(grid, oldGrid);

    this.flagCounter.countDown = grid.nMines;
    this.timer.reset();
    this.screenController.display.minesweeperGrid();
  }
  boot() {
    this.screenController.display.minesweeperMenu();
  }
}
