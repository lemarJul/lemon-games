import AbstractController from "../controllers/AbstractController.mjs";
//TODO implement enable and disable methods

export default class ScreenController extends AbstractController {
  constructor(HTMLElement) {
    super(HTMLElement);
    this.screens = {};
    this.display = {};
    this.bootScreen = null;
    this._activeScreen = null;
    this._registerEventListeners();
  }

  set activeScreen(screen) {
    if (this._activeScreen) this._activeScreen.hide();

    screen.show();
    this._activeScreen = screen;
  }

  // createScreen(screenOptions) {
  //   const screen = new ScreenElement(screenOptions)?.hide();
  //   this.wrappedElement.appendChild(screen);
  //   this.screens[screen.id] = screen;
  //   this.display[screen.id] = () => (this.activeScreen = screen);
  //   return screen;
  // }
  addScreenElementToDOM(screen) {
    screen.hide();

    this.wrappedElement.appendChild(screen);
    this.screens[screen.name] = screen;
    this.display[screen.name] = () => (this.activeScreen = screen);
  }

  enable() {
    const bootScreen = this.bootScreen || Object.values(this.screens)[0];
    this.activeScreen = bootScreen;
  }
  disable() {
    for (let screen in this.screens) {
      this.screens[screen].hide();
    }
  }
  // getScreenFromUrl(url) {
  //   const screenName = url.split("/").pop().replace(".mjs", "");
  //   const screen = this.screens[screenName];
  //   return screen;
  // }

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
