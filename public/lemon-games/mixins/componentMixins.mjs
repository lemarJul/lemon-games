//*STATIC METHODS
export const canStaticFetchContent = (superclass) => {
  return class extends superclass {
    static async _fetchContent(path) {
      const HTMLPath = path.replace(/\.mjs$/, ".html");
      this.content = await fetch(HTMLPath).then((response) => response.text());
    }
  };
};

function componentStyleURL(path) {
  return path.replace(/\.mjs$/, ".css");
}

export const canStaticFetchStyle = (superclass) => {
  return class extends superclass {
    static async _fetchStyle(path) {
      this.style = document.createElement("style");
      this.style.textContent = await fetch(componentStyleURL(path)).then(
        (response) => response.text()
      );
    }
  };
};

export function canLinkLocalStyle(superClass) {
  return class extends superClass {
    static loadedOnce = [];

    linkLocalStyle(
      componentPath,
      { once = true, rootNode = this.getRootNode(), type = "style" } = {}
    ) {
      if (this.constructor.loadedOnce.includes(componentPath)) return;
      if (once) this.constructor.loadedOnce.push(componentPath);

      if (type === "link") {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = componentStyleURL(componentPath);
        rootNode.prepend(link);
        // console.log("Style linked from URL:", componentPath);
        // console.log("Loaded once:", this.constructor.loadedOnce);
      }
      if (type === "style") {
        const style = document.createElement("style");
        fetch(componentStyleURL(componentPath))
          .then((response) => response.text())
          .then((text) => {
            style.textContent = text;
            rootNode.prepend(style);
          });
        // console.log("Style linked from URL:", componentPath);
        // console.log("Loaded once:", this.constructor.loadedOnce);
      }
    }
  };
}

export const canStaticRegisterFont = (superclass) => {
  return class extends superclass {
    static async _registerFont() {
      const font = new FontFace(
        "RetroGame",
        "url(lemon-games/assets/fonts/8_bit_pusab/8-bit-pusab.ttf)"
      );
      await font.load();
      document.fonts.add(font);
    }
  };
};

export function compose(...mixins) {
  return (superClass) =>
    mixins.reduce((c, mixin) => {
      return mixin(c);
    }, superClass);
}

export function canStaticRegisterAsComponent(superClass) {
  return class extends superClass {
    static get _tagName() {
      throw new Error("Subclass must override the static get tagName()");
    }
    static registerAsComponent(element = null) {
      if (!customElements.get(this._tagName)) {
        customElements.define(this._tagName, this, { extends: element });
      }
    }
  };
}
