import SquareMatrix from "./SquareMatrix.mjs";
import CellFactory from "../Cell/CellFactory.mjs";

export default class SquareGridElement extends HTMLElement {
  constructor(matrix) {
    super();
    this._matrix = matrix;
    this.nMines = matrix.nMines;
    this.safeCellsToRevealed = matrix.safeCellsCount;

    this._renderGrid();
    this._registerEventListeners();
  }

  _renderGrid() {
    this.style.setProperty("--n-columns", this._matrix.length);

    this._matrix.forEach((row, x) => {
      row.forEach((minesNearBy, y) => {
        const cell = CellFactory.createCell(x, y, minesNearBy);
        // this._matrix[x][y] = cell;
        this.appendChild(cell);
      });
    });
  }
  cellElement(x, y) {
    const childPosition = x * this._matrix.length + y;
    return this.children[childPosition];
  }

  _registerEventListeners() {
    const gameStartedHandler = (e) => {
      console.log("Game started!");
      this.dispatchEvent(
        new Event(SquareGridElement.events.started, { bubbles: true })
      );
    };
    this.addEventListener("click", gameStartedHandler, { once: true });

    const checkGridComplete = (e) => {
      const isGridComplete = !--this.safeCellsToRevealed;

      if (isGridComplete) {
        this.dispatchEvent(
          new Event(SquareGridElement.events.complete, { bubbles: true })
        );
      }
    };
    this.addEventListener(CellFactory.events.revealed, checkGridComplete);

    const cellRevealedHandler = (e) => {
      if (e.target.hasAdjacentMines) return;

      const { x, y } = e.target;
      const adjacentPositions = this._matrix.getAdjacentPositions(x, y);

      adjacentPositions.forEach(([x, y]) =>
        this.cellElement(x, y).dispatchEvent(
          new Event("click", { bubbles: true })
        )
      );
    };
    this.addEventListener(CellFactory.events.revealed, cellRevealedHandler);

    const gameLostHandler = (e) => {
      console.log("You lost!");
      this.dispatchEvent(
        new Event(SquareGridElement.events.stopped, { bubbles: true })
      );
    };
    this.addEventListener(CellFactory.events.exploded, gameLostHandler);
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

if (!customElements.get(SquareGridElement.tag)) {
  customElements.define(SquareGridElement.tag, SquareGridElement);
}
