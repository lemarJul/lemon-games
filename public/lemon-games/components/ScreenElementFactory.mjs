import ScreenElement from "./ScreenElementNEW.mjs";

export default class ScreenElementFactory {
  constructor(manager) {
    this.manager = manager;
  }

  async createScreenFromModule(module) {
    const modulePath = module.path;
    if (!modulePath) {
      throw new Error("Module path not found");
    }
    const id =
      module?.name || modulePath.split("/").pop().replace(".dynamizer.mjs", "");
    //content
    const contentPath = modulePath.replace(".dynamizer.mjs", ".html");
    const content = await fetch(contentPath).then((response) =>
      response.text()
    );
    //style
    const stylePath = modulePath.replace(".dynamizer.mjs", ".css");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = stylePath;
    //script

    const connectedCallback =
      module.createConnectedCallback(this.manager) || (() => {});

    const screen = new ScreenElement(id, content, link, connectedCallback);
    console.log("screen: " + screen);
    return screen;
  }
}
