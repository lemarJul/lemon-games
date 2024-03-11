import AbstractCell from "./AbstractCell.mjs";

export default class SafeCellElement extends AbstractCell {
  constructor(x, y, nAdjacentMines) {
    super(x, y);
    this._nAdjacentMines = nAdjacentMines;
  }

  _reveal() {
    super._reveal();
    this.classList.add(`near${this._nAdjacentMines}`);
    this.dispatchEvent(new Event(SafeCellElement.events.revealed, { bubbles: true }));
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
if (!customElements.get(SafeCellElement.tag)) {
  customElements.define(SafeCellElement.tag, SafeCellElement, { extends: "button" });
}
