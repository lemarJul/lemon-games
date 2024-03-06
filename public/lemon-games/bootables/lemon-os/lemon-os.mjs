import AbstractExe from "../AbstractExe.mjs";
import MineSweeper from "../minesweeper/Minesweeper.mjs";
import Snake from "../snake/Snake.mjs";
import BrickBreaker from "../brickbreacker/BrickBreaker.mjs";
import MenuButton from "./components/MenuButton.mjs";

import * as Screens from "./screens/index.mjs";

export default class LemonOS extends AbstractExe {
  constructor(
    { soundController, buttonController, screenController },
    gamesList = [MineSweeper]
  ) {
    super({
      name: "LemonOS",
      soundController,
      buttonController,
      screenController,
    });
    this._setupLaunchScreen();
    this._loadGames(gamesList);
    //load views

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
  _setupLaunchScreen() {
    const launchScreen = LemonOS.screens.find(
      (screen) => screen.name === "launch"
    );
    this.screenController.launchScreen = "launch";
  }
  _loadGames(gamesList) {
    gamesList.forEach((game) => {
      this.loadGame(game);
    });
  }

  static dirPath = new URL(".", import.meta.url).pathname;
  static screens = [
    {
      name: "launch",
      path: this.dirPath + "screens/launch.html",
      script: true,
    },
    {
      name: "mainMenu",
      path: this.dirPath + "screens/menu.html",
      script: true,
    },
    {
      name: "credits",
      path: this.dirPath + "screens/credits.html",
      script: true,
    },
  ];

  // static style = "lemon-os/screens/lemon-os.css";

  // todo: turn this to Array with objects with properties name, path, controlMapping, soundMapping, scriptMapping

  async loadGame(Game) {
    await Game.initialize();
    const game = new Game(this);

    this.updateGameList(game);
    return this;
  }

  updateGameList(game) {
    const gameList =
      this.screenController.wrappedElement.querySelector("#games-list");
    const button = document.createElement("menu-button");
    button.innerHTML = game.name;
    button.setAttribute("link", game.name);
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
await LemonOS.initialize()