import ButtonController from "./controllers/ButtonController.mjs";
import ScreenController from "./controllers/ScreenController.mjs";
import SoundController from "./controllers/SoundController.mjs";
import DataController from "./controllers/DataController.mjs";

const buttonController = new ButtonController();
const soundController = new SoundController();
const screenController = new ScreenController();

export default class AbstractExe {
  constructor(name) {
    this._abstractClassError();
    this._notInitializedError();

    this.name = name;
    this.screenController = screenController;
    this.buttonController = buttonController;
    this.soundController = soundController;
    this.dataController = new DataController(name);
    this._loadScreens();
  }

  //* INSTANCE METHODS
  _abstractClassError() {
    if (this.constructor === AbstractExe) {
      throw new Error(
        `Abstract class ${this.constructor.name} cannot be instantiated`
      );
    }
  }
  _notInitializedError() {
    if (!this.constructor._initialized) {
      throw new Error(
        `Class ${this.constructor.name} has not been initialized before instantiation`
      );
    }
  }

  _loadScreens() {
    const screens = this.constructor.screens;
    const loadSingleScreen = (screen) => {
      this.screenController.createScreen(screen);

      //TODO: where to put this? Who is responsible for loading the script?
      const { path, script } = screen;
      if (!script) return;
      const pathToScript = "../" + path.replace(".html", ".mjs");
      import(pathToScript)
        .then((module) => {

          module.default.call(this);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    screens.forEach(loadSingleScreen);
  }

  //* STATIC VARIABLES
  static screens = [
    // * Example
    //{
    //   name: "screen 1",
    //   path: "path/to/screen1.html",
    // },
    // {
    //   name: "screen 2",
    //   path: "path/to/screen2.html",
    //   script: true,
    // },
  ];

  static _initialized = false;

  //* STATIC METHODS
  static async initialize() {
    await this._fetchScreensContent();
    this._initialized = true;
  }

  static async _fetchScreensContent() {
    const fetchScreen = async (screen) => {
      try {
        const res = await fetch(screen.path);
        const content = await res.text();
        screen.content = content;
        console.log(this.name, " - fetched view: ", screen.name, screen.path);
      } catch (error) {
        console.error({
          message: "Failed to fetch view",
          screen,
          error,
        });
      }
    };

    await Promise.all(this.screens.map(fetchScreen));
  }
}
