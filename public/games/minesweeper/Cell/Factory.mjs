import CellSafe from "./Safe.mjs";
import CellMine from "./Mine.mjs";

export default class CellFactory {
  static createCell(x, y, minesNearBy) {
    if (!Number.isInteger(minesNearBy)) throw new Error("Invalid cell type");

    const isMine = minesNearBy === -1;
    return isMine ? new CellMine(x, y) : new CellSafe(x,y, minesNearBy);
  }
}
