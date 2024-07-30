export const CELL_VALUES = {
  DEFAUlT: 0,
  MINE: -1,
};

// const Cell = () => {
//   this.value = CELL_VALUES.DEFAUlT;
//   this.revealed = false;
//   this.flagged = false;
//   this.isMine = value === CELL_VALUES.MINE;
// };

export default class Cell {
  constructor(isMine = false) {
    value = CELL_VALUES.DEFAUlT;
    isMine = false;
    isFlagged = false;
    isRevealed = false;
  }
  reveal() {
    if (this.isFlagged) this.toggleFlag();
    this.isRevealed = true;
  }
  toggleFlag() {
    this.isFlagged = !this.isFlagged;
  }
}
