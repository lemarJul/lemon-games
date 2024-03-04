import SquareMatrix from "./SquareMatrix.mjs";
import CellFactory from "../Cell/CellFactory.mjs";
import MineCell from "../Cell/MineCell.mjs";
import SafeCell from "../Cell/SafeCell.mjs";

export default class SquareGrid extends HTMLElement {
  constructor({ length, nMines }, safeCorners = true) {
    super();
    this.nMines = nMines;
    this.safeCellsToRevealed = length * length - nMines;

    this._matrix = new SquareMatrix({ length, nMines, safeCorners });
    this._renderGrid();
    this._registerEventListeners();
  }

  _renderGrid() {
    this.style.setProperty("--n-columns", this._matrix.length);

    this._matrix.forEach((row, x) => {
      row.forEach((minesNearBy, y) => {
        const cell = CellFactory.createCell(x, y, minesNearBy);
        this._matrix[x][y] = cell;
        this.appendChild(cell);
      });
    });
  }

  _registerEventListeners() {
    const gameStartedHandler = (e) => {
      console.log("Game started!");
      this.dispatchEvent(
        new Event(SquareGrid.events.started, { bubbles: true })
      );
    };
    this.addEventListener("click", gameStartedHandler, { once: true });

    const checkGridComplete = (e) => {
      const isGridComplete = !--this.safeCellsToRevealed;

      if (isGridComplete) {
        this.dispatchEvent(
          new Event(SquareGrid.events.complete, { bubbles: true })
        );
      }
    };
    this.addEventListener(SafeCell.events.revealed, checkGridComplete);

    const cellRevealedHandler = (e) => {
      if (e.target.hasAdjacentMines) return;

      const { x, y } = e.target;
      const adjacentPositions = this._matrix.getAdjacentPositions(x, y);

      adjacentPositions.forEach(([x, y]) =>
        this._matrix[x][y].dispatchEvent(new Event("click", { bubbles: true }))
      );
    };
    this.addEventListener(SafeCell.events.revealed, cellRevealedHandler);

    const gameLostHandler = (e) => {
      console.log("You lost!");
      this.dispatchEvent(
        new Event(SquareGrid.events.stopped, { bubbles: true })
      );
    };
    this.addEventListener(MineCell.events.exploded, gameLostHandler);
  }

  get leftFlags() {
    return this._nFlags;
  }

  static get events() {
    return {
      started: "lg-grid-started",
      complete: "lg-grid-complete",
      stopped: "lg-grid-stopped",
    };
  }
  static get tag() {
    return "square-grid";
  }
}

if (!customElements.get(SquareGrid.tag)) {
  customElements.define(SquareGrid.tag, SquareGrid);
}
