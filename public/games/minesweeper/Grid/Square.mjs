import SquareMatrix from "./Matrix.mjs";
import CellFactory from "../Cell/Factory.mjs";

export default class SquareGrid {
  constructor({ length, nMines, safeCorners = true }) {
    this._HTMLContainer = document.getElementById("grid-container");
    this.nMines = nMines;
    this.safeCellsToRevealed = length * length - nMines;

    // this._matrix = this._initMatrix(nRows, nCols);
    // this._initMines(nMines);

    this._matrix = new SquareMatrix({ length: length, nMines, safeCorners });
    this._renderGrid();
    this._registerEventListeners();
  }

  _renderGrid() {
    this._HTMLContainer.innerHTML = "";
    this._HTMLContainer.style.setProperty("--n-columns", this._matrix.length);

    this._matrix.forEach((row, x) => {
      row.forEach((minesNearBy, y) => {
        const cell = CellFactory.createCell(x, y, minesNearBy);
        this._matrix[x][y] = cell;
        this._HTMLContainer.appendChild(cell);
      });
    });
  }

  _registerEventListeners() {
    const gameStartedHandler = (e) => {
      console.log("Game started!");
      this._HTMLContainer.dispatchEvent(
        new Event("gameStarted", { bubbles: true })
      );
      document.removeEventListener("cellRevealed", gameStartedHandler);
    };
    const cellRevealedHandler = (e) => {
      this.safeCellsToRevealed--;

      if (this._isGridComplete()) {
        console.log("You won!");
        this._HTMLContainer.dispatchEvent(
          new Event("gridComplete", { bubbles: true })
        );
      }

      const { target } = e;
      if (target?.noMinesNearby) {
        console.log("No mines nearby");
        const { x, y } = target;
        const adjacentPositions = this._matrix.getAdjacentPositions(x, y);

        adjacentPositions.forEach(([x, y]) =>
          this._matrix[x][y].dispatchEvent(new Event("click" , { bubbles: true }))
        );
      }
    };

    const gameLostHandler = (e) => {
      console.log("You lost!");
      this._HTMLContainer.dispatchEvent(
        new Event("gameStopped", { bubbles: true })
      );
    };

    document.addEventListener("cellRevealed", gameStartedHandler);
    document.addEventListener("cellRevealed", cellRevealedHandler);
    document.addEventListener("mineExploded", gameLostHandler);
  }
  _isGridComplete() {
    return this.safeCellsToRevealed == 0;
  }

  // _initMatrix(nRows, nCols) {
  //   const matrix = [];

  //   for (let x = 0; x < nRows; x++) {
  //     matrix[x] = [];
  //     for (let y = 0; y < nCols; y++) {
  //       matrix[x][y] = this._createCell(x, y);
  //     }
  //   }
  //   matrix.nRows = nRows;
  //   matrix.nCols = nCols;
  //   matrix.maxPosition = nRows - 1;
  //   matrix.minPosition = 0;

  //   return matrix;
  // }

  // _createCell(x, y) {
  //   const cell = new Cell(this);

  //   cell.addEventListener("click", () => {
  //     this._clickHandler(x, y);
  //     if (this._checkWin()) {
  //       console.log("You won!");
  //       document.dispatchEvent(new Event("gameWon"));
  //     }
  //   });
  //   return cell;
  // }

  // _initMines(nMines) {
  //   while (nMines) {
  //     const randomX = Math.floor(Math.random() * this._matrix.nRows);
  //     const randomY = Math.floor(Math.random() * this._matrix.nCols);
  //     const randomCell = this.cell(randomX, randomY);
  //     if (randomCell.isMine) continue;

  //     randomCell.setMine();

  //     const adjacentPositions = this._getAdjacentPositions(randomX, randomY);
  //     adjacentPositions.forEach(([x, y]) => {
  //       console.log(this.cell(x, y));
  //       console.log(x, y);
  //       this.cell(x, y).nAdjacentMines++;
  //     });
  //     nMines--;
  //   }
  // }

  cell(x, y) {
    return this._matrix[x][y];
  }

  // _getAdjacentPositions(x, y) {
  //   const adjacentPositions = [];
  //   const offsets = [-1, 0, 1];

  //   const isOutsideGrid = (axePosition) =>
  //     axePosition < this._matrix.minPosition ||
  //     axePosition > this._matrix.maxPosition;
  //   const isCentralCell = (offset_x, offset_y) => !offset_x && !offset_y;

  //   offsets.forEach((offset_x) => {
  //     const targetX = x + offset_x;

  //     if (isOutsideGrid(targetX)) return;

  //     offsets.forEach((offset_y) => {
  //       const targetY = y + offset_y;

  //       if (isOutsideGrid(targetY)) return;
  //       if (isCentralCell(offset_x, offset_y)) return;

  //       adjacentPositions.push([targetX, targetY]);
  //     });
  //   });
  //   return adjacentPositions;
  // }

  _clickHandler(x, y) {
    const cell = this.cell(x, y);
    if (cell.isRevealed) return;
    cell.reveal();
    if (!cell.isMine) this._revealedCellsCounter++;
    if (!cell.isMine && !cell.nAdjacentMines) {
      const adjacentPositions = this._getAdjacentPositions(x, y);
      adjacentPositions.forEach((posXY) => this._clickHandler(...posXY));
    }
  }
  // toggleFlagged(cell) {
  //   if (this.nMines) cell.toggleFlagged();
  // }

  get leftFlags() {
    return this._nFlags;
  }
}
