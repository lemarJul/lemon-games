import AbstractController from "./AbstractController.mjs";
import ScreenElement from "../../components/ScreenElement.mjs";
import MenuButton from "../../bootables/lemon-os/components/MenuButton.mjs";
  //TODO implement enable and disable methods

export default class ScreenController extends AbstractController {
  constructor(HTMLElement) {
    super(HTMLElement);
    this.screens = {};
    this.display = {};
    this._launchScreenId = null;
    this._activeScreen = null;
    this._registerEventListeners();
  }

  set activeScreen(screen) {
    if (this._activeScreen) this._activeScreen.hide();

    screen.show();
    this._activeScreen = screen;
  }
  set launchScreen(screenId) {
    this._launchScreenId = screenId;
  }

  createScreen(screenOptions) {
    const screen = new ScreenElement(screenOptions)?.hide();
    this.wrappedElement.appendChild(screen);
    this.screens[screen.id] = screen;
    this.display[screen.id] = () => (this.activeScreen = screen);
    return screen;
  }

  
  enable() {
    this.display[this._launchScreenId]();
  }
  disable() {
    for (let screen in this.screens) {
      this.screens[screen].hide();
    }
  }
  getScreenFromUrl(url) {
    const screenName = url.split("/").pop().replace(".mjs", "");
    const screen = this.screens[screenName];
    return screen;
  }

  static Events = {
    showScreen: new Event("showScreen", { bubbles: true }),
  };

  _registerEventListeners() {
    this.wrappedElement.addEventListener("showScreen", (e) => {
      const screenId = e.target.getAttribute("link");
      this.display[screenId]();
    });
  }
}
