import CellAbstract from "./Abstract.mjs";

export default class CellSafe extends CellAbstract {
  constructor(x, y, nAdjacentMines) {
    super(x, y);
    this.nAdjacentMines = nAdjacentMines;

    this.addEventListener("click", this.displayNearbyMines);
  }

  displayNearbyMines() {
    if (this.noMinesNearby) return;
    this.textContent = this.nAdjacentMines;
  }

  get noMinesNearby() {
    return this.nAdjacentMines === 0;
  }
}
customElements.define("safe-cell", CellSafe, { extends: "button" });
