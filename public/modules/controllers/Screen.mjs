export default class Screen extends HTMLElement {
  constructor({ name, path, content, script }) {
    super();
    this.id = name;
    this.src = path;
    // this.classList.add("screen");
    this.innerHTML = content;
  }
  static disabled = "disabled-screen";

  connectedCallback() {
    this.linkStyle();
  }
  linkStyle() {
    const pathToStyle = this.src.replace(".html", ".css");
    try {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = pathToStyle;
      this.appendChild(link);
      console.log(`Screen: ${this.id} loaded with CSS: ${link.href}`);
    } catch (error) {
      console.error("Error loading CSS:", error);
    }
  }

  show() {
    this.classList.remove(Screen.disabled);
    return this;
  }

  hide() {
    this.classList.add(Screen.disabled);
    return this;
  }
}

customElements.define("lemon-screen", Screen);
