import SafeCell from "./SafeCell.mjs";
import MineCell from "./MineCell.mjs";

export default class CellFactory {
  static createCell(x, y, minesNearBy) {
    if (!Number.isInteger(minesNearBy)) throw new Error("Invalid cell type");

    const isMine = minesNearBy === -1;
    return isMine ? new MineCell(x, y) : new SafeCell(x,y, minesNearBy);
  }
}
