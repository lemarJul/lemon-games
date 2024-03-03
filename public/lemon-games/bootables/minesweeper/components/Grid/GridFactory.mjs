import SquareGrid from "./SquareGrid.mjs"


export default class GridFactory {
  static _config = {
    // rows, cols, mines
    test: { length: 5, nMines: 2 },
    easy: { length: 8, nMines: 10 },
    medium: { length: 16, nMines: 40 },
    hard: { length: 20, nMines: 75 },
  };

  static createSquareGrid(difficulty, safeCorners) {
    if (!(difficulty in this._config)) {
      const difficulties = Object.keys(this._config).join(", ");
      throw new Error(
        `Invalid difficulty "${difficulty}": must be one of ${difficulties}`
      );
    }

    return new SquareGrid(this._config['test'], safeCorners);
  }
}
