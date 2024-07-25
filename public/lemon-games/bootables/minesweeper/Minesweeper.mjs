import AbstractExe from "../AbstractExe.mjs";
import DescendantsProvider from "./modules/DescendantsProvider.mjs";

import * as screenComponents from "./screens/index.mjs";
export default class MineSweeperManager extends AbstractExe {
  constructor({ screenController, buttonController, soundController }) {
    super({
      name: "MineSweeper",
      screenController,
      buttonController,
      soundController,
    });
    this.HTMLElements = DescendantsProvider(this.screenController);

    this._renderScreenComponents(screenComponents).then(() => {});
  }

  newGame() {
    const difficulty = this.HTMLElements.difficulty.value;
    const safeCorners = this.HTMLElements.safeCorners.value === "true";
    this.screenController.screens.minesweeperGrid.newGame(
      difficulty,
      safeCorners
    );
  }

  boot() {
    this.screenController.display.minesweeperMenu();
  }
}
