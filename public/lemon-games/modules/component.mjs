export class Component {
  static define(name, Component, extendsValue) {
    if (!customElements.get(name)) {
      customElements.define(name, Component, { extends: extendsValue });
    }
    return Component;
  }

  static async fetchHtml(path) {
    return fetch(path.replace(/\.mjs$/, ".html")).then((response) =>
      response.text()
    );
  }

  static async fetchCss(path) {
    return fetch(path.replace(/\.mjs$/, ".css")).then((response) =>
      response.text()
    );
  }

  static async fetchHtmlCss(path) {
    const html = await Component.fetchHtml(path);
    const css = await Component.fetchCss(path);
    return { html, css };
  }
}
