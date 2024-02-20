export default class SquareMatrix extends Array {
  constructor({ length, nMines, safeCorners = true }) {
    super();
    this._nMines = nMines;
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

    this._defaultValue = 0;
    this._mineValue = -1;

    this._initWithLength(length);
    const mines = this._setMines();
    mines.forEach(([x, y]) => this._incrementAdjacentCells(x, y));
  }

  _initWithLength(length) {
    for (let x = 0; x < length; x++) {
      this[x] = [];
      for (let y = 0; y < length; y++) {
        this[x][y] = this._defaultValue;
      }
    }
  }

  _setMines() {
    const mines = [];
    while (this._nMines) {
      const [x, y] = this._getRandomCoordinates();
      if (this._isMine(x, y)) continue;
      if (this._isSafeCorner(x, y)) continue;

      this[x][y] = this._mineValue;
      mines.push([x, y]);
      this._nMines--;
    }
    return mines;
  }

  _getRandomCoordinates() {
    const randomPosition = () => Math.floor(Math.random() * this.length);
    return ["x", "y"].map((axe) => randomPosition());
  }

  _isMine(x, y) {
    return this[x][y] < 0;
  }

  _isSafeCorner(x, y) {
    return this._safeCorners.some(
      ([cornerX, cornerY]) => x === cornerX && y === cornerY
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
