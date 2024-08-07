import CellFactory from "../Cell/CellFactory.mjs";
import { cellEvents } from "../Cell/index.mjs";
import { Component } from "../../../../modules/Component.mjs";
import { canLinkLocalStyle } from "../../../../mixins/componentMixins.mjs";
const style = await Component.fetchStyle(import.meta.url);

export default Component.define(
  "square-grid",
  class Grid extends canLinkLocalStyle(HTMLElement) {
    #matrix;
    #safeCellsToRevealed;
    constructor(matrix) {
      super();
      this.#matrix = matrix;
      this.#safeCellsToRevealed = matrix.safeCellsCount;
      this.#render();
    }

    #render() {
      // this.prepend(style.cloneNode(true));
      this.style.setProperty("--n-columns", this.#matrix.length);

      this.#matrix.forEach((row, x) => {
        row.forEach((minesNearBy, y) =>
          this.appendChild(CellFactory.createCell(x, y, minesNearBy))
        );
      });
    }

    connectedCallback() {
      this.linkLocalStyle(import.meta.url);
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
  }
);
