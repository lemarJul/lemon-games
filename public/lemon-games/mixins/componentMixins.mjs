export const StyleFromURLLinkable = {
  loaded: false,

  canLinkStyleFromURL(path) {
    const stylePath = path.replace(/\.mjs$/, ".css");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = stylePath;
  },
};

//*STATIC METHODS
export const canStaticFetchContent = {
  async _fetchContent(path) {
    const HTMLPath = path.replace(/\.mjs$/, ".html");
    this.content = await fetch(HTMLPath).then((response) => response.text());
  },
};
export const canStaticFetchStyle = {
  async _fetchStyle(path) {
    const stylePath = path.replace(/\.mjs$/, ".css");
    this.style = document.createElement("style");
    this.style.textContent = await fetch(stylePath).then((response) =>
      response.text()
    );
  },
};

export const canStaticRegisterFont = {
  async _registerFont() {
    const font = new FontFace(
      "RetroGame",
      "url(lemon-games/assets/fonts/8_bit_pusab/8-bit-pusab.ttf)"
    );
    await font.load();
    document.fonts.add(font);
  },
};

export function compose(...mixins) {
  return (superClass) =>
    mixins.reduce((c, mixin) => {
      console.log(mixin.name);
      return mixin(c);
    }, superClass);
}

export function canStaticRegisterOnce(superClass) {
  return class extends superClass {
    static get _tagName() {
      throw new Error("Subclass must override the static get tagName()");
    }
    static registerOnce(element) {
      if (!customElements.get(this._tagName)) {
        customElements.define(this._tagName, this, { extends: element });
      }
    }
  };
}
