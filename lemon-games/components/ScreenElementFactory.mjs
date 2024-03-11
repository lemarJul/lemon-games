import ScreenElement from "./ScreenElementNEW.mjs";

export default class ScreenElementFactory {
  constructor(manager) {
    this.manager = manager;
  }

  async createScreenFromPath(path, { init = () => {} } = {}) {
    const modulePath = path;
    const pathWith = (ext) => modulePath.replace(".mjs", ext);

    //id
    const managerName = this.manager.name.toLowerCase();
    const screenName = pathWith("").split("/").pop();
    const id = managerName + "-" + screenName;
    //content
    const content = await fetch(pathWith(".html")).then((response) =>
      response.text()
    );
    //style

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = pathWith(".css");
    //script

    const screen = new ScreenElement(id, content, link, init);

    return screen;
  }
}
