import DataController from "../modules/controllers/DataController.mjs"

export default class AbstractExe {
  constructor({ name, soundController, buttonController, screenController }) {
    this._abstractClassError();
    this._notInitializedError();
    this.soundController = soundController;
    this.screenController = screenController;
    this.buttonController = buttonController;
    this.name = name;
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

    const loadSingleScreen = async (screen) => {
      const screenElement = this.screenController.createScreen(screen);

      if (!screen.script) return;

      const baseURL =  new URL( import.meta.url).origin
      console.log({baseURL})
      const pathToScript = baseURL+ screen.path.replace(".html", ".dynamizer.mjs");
      console.log({pathToScript})
      try {
        const dynamizer = await import(pathToScript);
        dynamizer.default.call(this, screenElement);
      } catch (error) {
        console.error({
          message: "Failed to load script",
          screen,
          error,
        });
      }
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
