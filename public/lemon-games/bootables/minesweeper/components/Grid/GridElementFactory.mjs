import SquareGridElement from "./SquareGridElement.mjs";
import SquareMatrix from "./SquareMatrix.mjs";

export const difficulties = {
  // rows, cols, mines
  // test: { length: 5, nMines: 2 },
  easy: { length: 8, nMines: 10 },
  medium: { length: 12, nMines: 25 },
  hard: { length: 16, nMines: 50 },
};

export default class GridFactory {
  static get difficulties() {
    return difficulties;
  }

  static createSquareGrid(difficulty, safeCorners = true) {
    this._validateDifficulty(difficulty);
    const params = { ...this.difficulties[difficulty], safeCorners };
    const matrix = new SquareMatrix(params);
    return new SquareGridElement(matrix);
  }

  static _validateDifficulty(difficulty) {
    if (difficulty in this.difficulties) return;
    const difficulties = Object.keys(this.difficulties).join(", ");
    throw new Error(
      `Invalid difficulty "${difficulty}": must be one of ${difficulties}`
    );
  }
}
