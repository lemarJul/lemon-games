export default class Array2D extends Array {
  constructor(nRow, nCol, defaultValue = null) {
    super(nRow);
    for (let row = 0; row < nRow; row++)
      this[row] = Array(nCol).fill(defaultValue);

    this._MIN_X = this._MIN_Y = 0;
    this._MAX_X = nRow - 1;
    this._MAX_Y = nCol - 1;
  }
  get rowLength() {
    return this.length;
  }
  get colLength() {
    return this[0].length;
  }
}
