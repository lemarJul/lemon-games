export default class SquareMatrix extends Array {
  constructor({ length, safeCorners, nMines }) {
    super(length);
    this._minPos = 0;
    this._maxPos = length - 1;
    this._safeCorners = safeCorners
      ? [
          [this._minPos, this._minPos],
          [this._minPos, this._maxPos],
          [this._maxPos, this._minPos],
          [this._maxPos, this._maxPos],
        ]
      : [];
    this._nMines = nMines;
    this._minesCoordinates = [];

    this._defaultCellValue = 0;
    this._mineValue = -1;

    this._initDefaultCells();
    this._setMines();
    this._setAdjacentToMinesCells();
  }
  get nMines() {
    return this._nMines;
  }
  get safeCellsCount() {
    return this.length * this.length - this._nMines;
  }

  _initDefaultCells() {
    for (let x = 0; x < this.length; x++) {
      this[x] = Array(this.length).fill(this._defaultCellValue);
    }
  }
  _setMines() {
    while (this._minesCoordinates.length < this._nMines) {
      const [x, y] = this._getRandomCoordinates();
      this._laySingleMine(x, y);
    }
  }

  _getRandomCoordinates() {
    const randomPosition = () => Math.floor(Math.random() * this.length);
    return ["x", "y"].map((axe) => randomPosition());
  }

  _laySingleMine(x, y) {
    if (this._isMine(x, y) || this._isSafeCorner(x, y)) return;

    this[x][y] = this._mineValue;
    this._minesCoordinates.push([x, y]);
  }

  _isMine(x, y) {
    return this[x][y] === this._mineValue;
  }

  _isSafeCorner(x, y) {
    return this._safeCorners.some(
      ([cornerX, cornerY]) => x === cornerX && y === cornerY
    );
  }
  _setAdjacentToMinesCells() {
    this._minesCoordinates.forEach(([x, y]) =>
      this._incrementAdjacentCells(x, y)
    );
  }

  _incrementAdjacentCells(x, y) {
    const adjacentPositions = this.getAdjacentPositions(x, y);
    adjacentPositions.forEach(([x, y]) => {
      if (this._isMine(x, y)) return;
      this[x][y]++;
    });
  }

  getAdjacentPositions(centralX, centralY) {
    const adjacentPositions = [];
    const offsets = [-1, 0, 1];

    const isOutsideGrid = (axePosition) =>
      axePosition < this._minPos || axePosition > this._maxPos;
    const isCentralCell = (x, y) => x === centralX && y === centralY;

    offsets.forEach((offset_x) => {
      offsets.forEach((offset_y) => {
        const x = centralX + offset_x;
        const y = centralY + offset_y;
        if (isOutsideGrid(x)) return;
        if (isOutsideGrid(y)) return;
        if (isCentralCell(x, y)) return;

        adjacentPositions.push([x, y]);
      });
    });

    return adjacentPositions;
  }
}
