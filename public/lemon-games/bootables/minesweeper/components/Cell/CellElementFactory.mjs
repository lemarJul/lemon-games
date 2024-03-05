import SafeCellElement from "./SafeCellElement.mjs";
import MineCellElement from "./MineCellElement.mjs";

export default class CellElementFactory {
  static createCell(x, y, minesNearBy) {
    if (!Number.isInteger(minesNearBy)) throw new Error("Invalid cell type");

    const isMine = minesNearBy === -1;
    return isMine ? new MineCellElement(x, y) : new SafeCellElement(x, y, minesNearBy);
  }

  static get events() {
    return {
      ...SafeCellElement.events,
      ...MineCellElement.events,
    };
  }
}
