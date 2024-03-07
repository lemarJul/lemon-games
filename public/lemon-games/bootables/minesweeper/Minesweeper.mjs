import AbstractExe from "../AbstractExe.mjs";
import GridElementFactory from "./components/Grid/GridElementFactory.mjs";
import TimerDisplay from "./modules/TimerDisplay.mjs";
import FlagCounter from "./modules/FlagCounter.mjs";
import HTMLElements from "./modules/HtmlElements.mjs";

export default class MineSweeper extends AbstractExe {
  static dirPath = new URL(".", import.meta.url).pathname;
  static screens = [
    {
      name: "MineSweeper",
      path: this.dirPath + "screens/menu.html",
      script: true,
    },
    {
      name: "grid",
      path: this.dirPath + "screens/grid.html",
      script: true,
    },
    {
      name: "fail",
      path: this.dirPath + "screens/fail.html",
      script: true,
    },
    {
      name: "win",
      path: this.dirPath + "screens/win.html",
      script: true,
    },
    {
      name: "settings",
      path: this.dirPath + "screens/settings.html",
      script: true,
    },
    {
      name: "leaderboard",
      path: this.dirPath + "screens/leaderboard.html",
      script: true,
    },
    {
      name: "paused",
      path: this.dirPath + "/screens/paused.html",
      script: true,
    },
  ];
  // static style = "games/minesweeper/screens/index.css";

  constructor({ screenController, buttonController, soundController }) {
    super({
      name: "MineSweeper",
      screenController,
      buttonController,
      soundController,
    });
    this.HTMLElements = HTMLElements(this.screenController.wrappedElement);
    this.timer = new TimerDisplay(this.HTMLElements.timer);
    this.flagCounter = new FlagCounter(this.HTMLElements.flagCounter);
  }

  newGame() {
    this.started = false;

    const gridScreen = this.screenController.screens.grid;
    const oldGrid = gridScreen.querySelector("square-grid");
    const difficulty = this.HTMLElements.difficulty.value;
    const safeCorners = this.HTMLElements.safeCorners.value === "true";
    const grid = GridElementFactory.createSquareGrid(difficulty, safeCorners);

    gridScreen.replaceChild(grid, oldGrid);

    this.flagCounter.countDown = grid.nMines;
    this.timer.reset();
    this.screenController.display.grid();
  }
}
