export default class AbstractComponent extends HTMLElement {
  constructor() {
    super();
  }
  static _classStyleLoaded = false;

  _linkClassStyleOnce(path) {
    if (!this.constructor.classStyleLoaded) {
      const classStylePath = path.replace(".mjs", ".css");
      this._linkStyle(classStylePath);
      this.constructor.classStyleLoaded = true;
    }
  }

  _linkStyle(styleUrl, rootNode = this.getRootNode()) {
    try {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = styleUrl;
      rootNode.prepend(link);
      console.log(`Screen: ${this.id} loaded with CSS: ${link.href}`);
    } catch (error) {
      console.error("Error loading CSS:", error);
    }
  }
}
