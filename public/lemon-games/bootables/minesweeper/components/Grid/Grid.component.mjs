import CellFactory from "../Cell/CellFactory.mjs";
import { cellEvents } from "../Cell/index.mjs";
export default class Grid extends HTMLElement {
  #matrix;
  #safeCellsToRevealed;
  constructor(matrix) {
    super();
    this.#matrix = matrix;
    this.#safeCellsToRevealed = matrix.safeCellsCount;
    this.#render();
  }

  #render() {
    this.style.setProperty("--n-columns", this.#matrix.length);

    this.#matrix.forEach((row, x) => {
      row.forEach((minesNearBy, y) =>
        this.appendChild(CellFactory.createCell(x, y, minesNearBy))
      );
    });
  }

  connectedCallback() {
    this.#eventsListeners.forEach(({ on, handler, options }) => {
      this.addEventListener(on, handler, options);
    });
  }

  disconnectedCallback() {
    this.#eventsListeners.forEach(({ on, handler, options }) => {
      this.removeEventListener(on, handler, options);
    });
  }

  get #eventsListeners() {
    return [
      {
        on: "click",
        handler: () => this.#dispatch(Grid.events.started),
        options: { once: true },
      },
      {
        on: cellEvents.revealed,
        handler: (e) => {
          if (!e.target.hasAdjacentMines) this.#revealAdjacentTo(e.target);
        },
      },
      {
        on: cellEvents.revealed,
        handler: () => {
          const isGridComplete = !--this.#safeCellsToRevealed;

          if (isGridComplete) {
            this.#dispatch(Grid.events.complete);
          }
        },
      },
      {
        on: cellEvents.exploded,
        handler: () => this.#dispatch(Grid.events.stopped),
      },
    ];
  }

  #dispatch(event) {
    this.dispatchEvent(new Event(event, { bubbles: true }));
  }

  static get events() {
    return {
      started: "lg-grid-started",
      complete: "lg-grid-complete",
      stopped: "lg-grid-stopped",
    };
  }

  #revealAdjacentTo({ x, y }) {
    const adjacentPositions = this.#matrix.getAdjacentPositionsTo(x, y);

    adjacentPositions.forEach(([x, y]) =>
      this.#getCell(x, y).dispatchEvent(new Event("click", { bubbles: true }))
    );
  }

  #getCell(x, y) {
    const cellIndex = x * this.#matrix.length + y;
    return this.children[cellIndex];
  }

  get nMines() {
    return this.#matrix.nMines || 0;
  }

  static get #tag() {
    return "square-grid";
  }
  static registerOnce() {
    if (!customElements.get(this.#tag)) {
      customElements.define(this.#tag, this);
    }
  }
}
Grid.registerOnce();
