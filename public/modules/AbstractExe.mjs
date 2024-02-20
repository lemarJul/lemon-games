import ButtonController from "./controllers/ButtonController.mjs";
import ScreenController from "./controllers/ScreenController.mjs";
import SoundController from "./controllers/SoundController.mjs";

const buttonController = new ButtonController();
const soundController = new SoundController();
const screenController = new ScreenController();

export default class AbstractExe {
  constructor(name) {
    this.abstractClassError();
    this.notInitializedError();

    this.name = name;
    this.screenController = screenController;
    this.buttonController = buttonController;
    this.soundController = soundController;
    this.addScreens();
  }

  abstractClassError() {
    if (this.constructor === AbstractExe) {
      throw new Error(
        `Abstract class ${this.constructor.name} cannot be instantiated`
      );
    }
  }
  notInitializedError() {
    if (!this.constructor.isInitialized) {
      throw new Error(
        `Class ${this.constructor.name} has not been initialized before instantiation`
      );
    }
  }

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

  static isInitialized = false;

  static async initialize() {
    await this.fetchScreenContent();
    this.isInitialized = true;
  }

  static async fetchScreenContent() {
    if (this.screens.length === 0) return;

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

  addScreens() {
    const screens = this.constructor.screens;
    const registerScreen = (screen) => {
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
    screens.forEach(registerScreen);
  }

  // loadStyle() {
  //   const href = this.constructor.style;

  //   if (!href) {
  //     return;
  //   }

  //   const style = document.createElement("link");
  //   style.rel = "stylesheet";
  //   style.href = href;
  //   document.head.appendChild(style);
  //   console.log(this.constructor.name, " - loaded style: ", href);
  // }

  // static async loadViews(ScreenController) {
  //     //fetch views
  //     const views = fetch(this.viewsURL)
  //       .then((res) => res.json())
  //       .then((views) => {
  //         Object.entries(views).forEach(([viewsName, viewsContent]) => {
  //           console.log(viewsName, viewsContent);
  //           const camelCased = (string) =>
  //             string.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  //           const noExtension = (string) => string.replace(/\.[^/.]+$/, "");
  //           viewsName = camelCased(noExtension(viewsName));
  //           console.log(viewsName);

  //           ScreenController.addScreen(viewsName, viewsContent);
  //         });
  //       });
  //     //add them to the DOM
  //   }
}
