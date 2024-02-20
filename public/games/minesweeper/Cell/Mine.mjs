import CellAbstract from "./Abstract.mjs";

export default class CellMine extends CellAbstract {
  constructor(x, y) {
    super(x, y);

    const eventListeners = [{ event: "click", listener: this.boom }];
    this.registerEventListeners(eventListeners);
  }

  boom() {
    this.classList.add("exploded");
    this.dispatchEvent(new Event("mineExploded", { bubbles: true }));
  }
}
customElements.define("mine-cell", CellMine, { extends: "button" });