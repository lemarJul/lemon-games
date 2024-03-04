import SquareGrid from "./SquareGrid.mjs"


export default class GridFactory {
  static difficulties = {
    // rows, cols, mines
    // test: { length: 5, nMines: 2 },
    easy: { length: 8, nMines: 10 },
    medium: { length: 12, nMines: 25 },
    hard: { length: 16, nMines: 50 },
  };

  static createSquareGrid(difficulty, safeCorners) {
    if (!(difficulty in this.difficulties)) {
      const difficulties = Object.keys(this.difficulties).join(", ");
      throw new Error(
        `Invalid difficulty "${difficulty}": must be one of ${difficulties}`
      );
    }

    return new SquareGrid(this.difficulties[difficulty], safeCorners);
  }
}
