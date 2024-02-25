import AbstractExe from "../modules/AbstractExe.mjs";
import MineSweeper from "../games/minesweeper/Minesweeper.mjs";
import Snake from "../games/snake/Snake.mjs";
import BrickBreaker from "../games/brickbreacker/BrickBreaker.mjs";

export default class LemonOS extends AbstractExe {
  constructor(gamesList = [MineSweeper]) {
    super("LemonOS");

    gamesList.forEach((game) => {
      this.loadGame(game);
    });

    this.gameCollection = {};
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
    this.mapButtons();

    console.log(this.constructor.name, "is ready");
  }

  static screens = [
    {
      name: "launch",
      path: "lemon-os/screens/launch.html",
    },
    {
      name: "mainMenu",
      path: "lemon-os/screens/menu.html",
      script: true,
    },
    {
      name: "credits",
      path: "lemon-os/screens/credits.html",
      script: true,
    },
  ];

  // static style = "lemon-os/screens/lemon-os.css";

  // todo: turn this to Array with objects with properties name, path, controlMapping, soundMapping, scriptMapping

  mapButtons() {
    this.buttonController.mapButtons(this.buttonMapping);
  }

  async loadGame(Game) {
    await Game.initialize();
    const game = new Game();
    this.gameCollection[game.name] = game;

    this.updateGameList(game);
    return this;
  }

  updateGameList(game) {
    const gameList = document.getElementById("games-list");
    console.log("gameList", gameList);
    const buttonTemplate = document.getElementById("game-button-template");
    const clone = buttonTemplate.content.cloneNode(true);
    clone.querySelector("button").innerHTML = game.name;
    clone.querySelector("button").addEventListener("click", () => {
      console.log("clicked", game.name);
      this.screenController.display[game.name]();
    });
    gameList.insertBefore(clone, gameList.firstChild);
  }

  boot() {
    [
      this.screenController,
      this.soundController,
      this.buttonController,
    ].forEach((controller) => controller.enable());
    this.launchSequence();
  }

  launchSequence() {
    this.soundController.play.start();
    this.screenController.display.launch();
    setTimeout(() => {
      this.screenController.display.mainMenu();
    }, 3000);
  }

  shutDown() {
    [
      this.screenController,
      this.soundController,
      this.buttonController,
    ].forEach((controller) => controller.disable());
  }
}
