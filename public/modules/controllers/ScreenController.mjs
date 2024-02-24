import AbstractController from "./AbstractController.mjs";
import HTML from "../HtmlProvider.js";
import Screen from "../Screen.mjs";

export default class ScreenController extends AbstractController {
  constructor() {
    super();
    this.container = HTML.display;
    this.screens = {};
    this.display = {};
    this._currentScreen = null;
  }
  set currentScreen(screen) {
    if (this._currentScreen) {
      this._currentScreen.hide();
    }
    screen.show();
    this._currentScreen = screen;
  }

  createScreen(screenOptions) {
    const screen = new Screen(screenOptions)?.hide();
    this.container.appendChild(screen);
    this.screens[screen.id] = screen;
    this.display[screen.id] = () => (this.currentScreen = screen);
    return this;
  }
  disable() {
    for (let screen in this.screens) {
      this.screens[screen].hide();
    }
  }
}
