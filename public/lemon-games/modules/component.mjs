export class Component {
  static define(name, Component, { extends: extendsValue } = {}) {
    if (!customElements.get(name)) {
      customElements.define(name, Component, { extends: extendsValue });
    }
    return Component;
  }

  static async fetchHtml(path) {
    return fetch(path.replace(/\.mjs$/, ".html"))
      .then((response) => response.text())
      .then((text) => {
        console.log("text", text);
        return Component.parseHTML(text);
      });
  }

  static async fetchStyle(path) {
    const style = document.createElement("style");
    style.textContent = await fetch(path.replace(/\.mjs$/, ".css")).then(
      (response) => response.text()
    );
    return style;
  }

  static async fetchHtmlAndStyle(path) {
    const html = await Component.fetchHtml(path);
    const css = await Component.fetchStyle(path);
    return { html, css };
  }
  static parseHTML(htmlString) {
    return document.createRange().createContextualFragment(htmlString)
      .firstElementChild;
  }
  // static render(component) {
  //   if (!component.template)
  //     throw Error(`·Missing template property in component ${component.name}`);
  //   component.innerHtml = "";
  //   component.appendChild(Component.parseHTML(component.template).content);
  // }
}
