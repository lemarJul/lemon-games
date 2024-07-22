import AbstractExe from "../AbstractExe.mjs";
import MineSweeper from "../minesweeper/Minesweeper.mjs";
import Snake from "../snake/Snake.mjs";
import BrickBreaker from "../brickbreacker/BrickBreaker.mjs";
import MenuButton from "./components/MenuButton.component.mjs";

import * as screenComponentsFactoryFns from "./screens/index.mjs";

export default class LemonOS extends AbstractExe {
  constructor(
    { soundController, buttonController, screenController },
    games = [MineSweeper]
  ) {
    super({
      name: "LemonOS",
      soundController,
      buttonController,
      screenController,
    });
    this.games = games;

    this._renderScreenComponents(screenComponentsFactoryFns);

    // setup buttons
    this.buttonMapping = {
      primaryButton: () => {
        console.log(this.constructor.name, " - primary button clicked");
      },
      secondaryButton: () => {
        console.log(this.constructor.name, " - secondary button clicked");
      },
      leftButton: () => {
        console.log(this.constructor.name, " - left button clicked");
      },
      rightButton: () => {
        console.log(this.constructor.name, " - right button clicked");
      },
      startButton: () => {
        console.log(this.constructor.name, " - start button clicked");
      },
    };
    this.buttonController.mapButtons(this.buttonMapping);

    console.log(this.constructor.name, " - is ready");
  }
  _renderScreenComponents(factoryFns) {
    Object.values(factoryFns).forEach(async (createScreen) => {
      const screen = await createScreen(this);
      this.screenController.addScreenElementToDOM(screen);
    });
  }

  loadGames() {
    this.games.forEach((game) => {
      this._loadSingleGame(game);
    });
  }

  // todo: turn this to Array with objects with properties name, path, controlMapping, soundMapping, scriptMapping
  async _loadSingleGame(Game) {
    const game = new Game(this);

    this.updateGameList(game);
    return this;
  }

  updateGameList(game) {
    const gameList =
      this.screenController.wrappedElement.querySelector("#games-list");
    const button = document.createElement("menu-button");
    button.innerHTML = game.name;
    button.addEventListener("click", () => {
      game.boot();
    });
    gameList.appendChild(button);
  }

  boot() {
    [
      this.screenController,
      this.soundController,
      this.buttonController,
    ].forEach((controller) => controller.enable());
  }

  shutDown() {
    [
      this.screenController,
      this.soundController,
      this.buttonController,
    ].forEach((controller) => controller.disable());
  }
}
// await LemonOS.initialize();
