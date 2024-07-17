import Array2D from "./Array2D.mjs";
import { CELL_VALUES } from "./Cell.mjs";

export default class SquareMatrix extends Array2D {
  #safeCorners;
  #minesCoordinates;
  constructor({ length, safeCorners, nMines } = {}) {
    super(length, length, CELL_VALUES.DEFAUlT);
    this.#safeCorners = safeCorners
      ? [
          [this._MIN_X, this._MIN_Y],
          [this._MIN_X, this._MAX_Y],
          [this._MAX_X, this._MIN_Y],
          [this._MAX_X, this._MAX_Y],
        ]
      : [];
    this.nMines = nMines;
    this.#minesCoordinates = [];
    this.#initMines();
  }

  get safeCellsCount() {
    console.log("called:  safeCellsCount");
    return this.length * this.length - this.nMines;
  }

  #initMines() {
    let counter = this.nMines;

    do {
      const coordinates = this.#getRandomCoordinates();
      if (this.#isSafeCorner(...coordinates) || this.#isMine(...coordinates))
        continue;

      this.#setMine(...coordinates);
      counter--;
    } while (counter);
  }

  #getRandomCoordinates() {
    const randomPosition = () => Math.floor(Math.random() * this.length);
    return [randomPosition(), randomPosition()];
  }
  #isSafeCorner(x, y) {
    return this.#safeCorners.some(
      ([cornerX, cornerY]) => x === cornerX && y === cornerY
    );
  }
  #isMine(x, y) {
    return this[x][y] === CELL_VALUES.MINE;
  }
  #setMine(x, y) {
    this[x][y] = CELL_VALUES.MINE;
    this.#incrementCellsAdjacentTo(x, y);
  }
  #incrementCellsAdjacentTo(x, y) {
    this.getAdjacentPositionsTo(x, y).forEach(([x, y]) => {
      if (!this.#isMine(x, y)) this[x][y]++;
    });
  }
  getAdjacentPositionsTo(x, y) {
    const output = [];
    const offsets = [-1, 0, 1];
    offsets.forEach((offset_x) => {
      offsets.forEach((offset_y) => {
        const [x_, y_] = [x + offset_x, y + offset_y];
        const isZeroOffset = offset_x === 0 && offset_y === 0;
        const isNonValidX = x_ < this._MIN_X || x_ > this._MAX_X;
        const isNonValidY = y_ < this._MIN_Y || y_ > this._MAX_Y;
        if (isZeroOffset || isNonValidX || isNonValidY) return;
        output.push([x_, y_]);
      });
    });
    return output;
  }
}
