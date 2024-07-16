import AbstractCell from "./AbstractCell.component.mjs";

export default class SafeCell extends AbstractCell {
  constructor(x, y, nAdjacentMines) {
    super(x, y);
    this._nAdjacentMines = nAdjacentMines;
  }

  _reveal() {
    super._reveal();
    this.classList.add(`near${this._nAdjacentMines}`);
    this.dispatchEvent(new Event(SafeCell.events.revealed, { bubbles: true }));
  }

  get hasAdjacentMines() {
    return this._nAdjacentMines !== 0;
  }

  static get events() {
    const events = super.events;
    events.revealed = "lg-safe-cell-revealed";
    return events;
  }
  static get tag() {
    return "safe-cell";
  }
}
if (!customElements.get(SafeCell.tag)) {
  customElements.define(SafeCell.tag, SafeCell, { extends: "button" });
}
