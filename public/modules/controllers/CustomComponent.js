export default class CustomComponent extends HTMLElement {
  constructor(src) {
    super();
    this.src = src ?? this.getAttribute("src") ?? false;
    this.css = [...this.src.split(".")[0], ".css"].join("");

    if (this.src) {
      Promise.all([this.loadHtml(this.src), this.loadHtml(this.css)]).then(
        ([html, css]) => {
          const documentString = `<head></head><body>${html}</body>`;

          const document = new DOMParser().parseFromString(
            documentString,
            "text/html"
          );

          const style = document.createElement("style");
          style.innerHTML = css;
          const template = document.querySelector("template").content;

          template.appendChild(style);

          //          this.replaceWith( template.cloneNode(true) )
          this.attachShadow({ mode: "open" }).appendChild(
            template.cloneNode(true)
          );

          this.dispatchEvent(new Event("shadow-attached"));
        }
      );
    }
  }

  loadHtml(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error! status: " + response.status);
        }

        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
customElements.define("custom-component", CustomComponent);
