import Grid from "./Grid.component.mjs";
import Matrix from "../../modules/SquareMatrix.mjs";
import { DIFFICULTIES } from "../../settings/difficulties.mjs";

export default class GridFactory {
  static createGrid(difficulty, safeCorners = true) {
    this.#validateDifficulty(difficulty);

    return new Grid(
      new Matrix({ ...DIFFICULTIES[difficulty], safeCorners })
    );
  }

  static #validateDifficulty(difficulty) {
    if (!(difficulty in DIFFICULTIES))
      throw new Error(
        `Invalid difficulty "${difficulty}": must be one of ${Object.keys(
          DIFFICULTIES
        ).join(", ")}`
      );
  }
}
