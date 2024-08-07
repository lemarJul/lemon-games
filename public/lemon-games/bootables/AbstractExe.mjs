import DataController from "../controllers/DataController.mjs";
import ScreenFactory from "../components/ScreenFactory.mjs";

export default class AbstractExe {
  constructor({ name, soundController, buttonController, screenController }) {
    this._abstractClassError();
    this.soundController = soundController;
    this.screenController = screenController;
    this.buttonController = buttonController;
    this.name = name;
    this.dataController = new DataController(name);
    this.screenElementFactory = new ScreenFactory(this);
  }

  //* INSTANCE METHODS
  _abstractClassError() {
    if (this.constructor === AbstractExe) {
      throw new Error(
        `Abstract class ${this.constructor.name} cannot be instantiated`
      );
    }
  }

  async _renderScreenComponents(factoryFns) {
    return Promise.all(
      Object.values(factoryFns).map(async (createScreen) => {
        const screen = await createScreen(this);
        this.screenController.appendChild(screen);
      })
    );
  }
}
