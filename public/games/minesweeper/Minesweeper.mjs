import AbstractExe from "../../modules/AbstractExe.mjs";
import GridFactory from "./Grid/Factory.mjs";
import TimerDisplay from "./HUD/TimerDisplay.mjs";
import FlagCounter from "./HUD/FlagCounter.mjs";
import HTMLElements from "./HtmlElements.mjs";

export default class MineSweeper extends AbstractExe {
  static screens = [
    {
      name: "MineSweeper",
      path: "games/minesweeper/screens/index.html",
      script: true,
    },
    {
      name: "grid",
      path: "games/minesweeper/screens/grid.html",
      script: true,
    },
    { name: "fail", path: "games/minesweeper/screens/fail.html", script: true },
    { name: "win", path: "games/minesweeper/screens/win.html" },
    {
      name: "settings",
      path: "games/minesweeper/screens/settings.html",
      script: true,
    },
    { name: "leaderboard", path: "games/minesweeper/screens/leaderboard.html" },
  ];
  // static style = "games/minesweeper/screens/index.css";

  constructor() {
    super("MineSweeper");
    this.htmlElements = HTMLElements;
    this.timer = new TimerDisplay(document.getElementById("timer"));
    this.flagCounter = new FlagCounter(document.getElementById("mine-counter"));
    // this.initEventHandlers();
  }

  newGame() {
    this.started = false;
    const difficulty = this.htmlElements.difficulty.value;
    let grid;
    try {
      grid = GridFactory.createSquareGrid(difficulty);
    } catch (error) {
      console.error(error);
      return;
    }
    this.flagCounter.setTo(grid.nMines);
    this.timer.reset();
    this.screenController.display.grid();
  }
}
