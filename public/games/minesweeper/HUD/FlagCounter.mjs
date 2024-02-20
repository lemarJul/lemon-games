import CellAbstract from "../Cell/Abstract.mjs";

export default class FlagCounter {
  constructor(htmlElement) {
    this._htmlElement = htmlElement;
    this._registerEventListeners();
  }
  _registerEventListeners() {
    document.addEventListener("flagToggled", this._update.bind(this));
  }
  _update(e) {
    const cell = e.target;

    const isFlagged = cell.classList.contains("flagged");
    if (isFlagged) {
      this._decrease();
    } else {
      this._increase();
    }
  }

  _decrease() {
    this._htmlElement.innerHTML = this._formated(--this._Flags);
  }
  _increase() {
    this._htmlElement.innerHTML = this._formated(++this._Flags);
  }

  _formated(n) {
    return ("00" + n).slice(-2);
  }
  setTo(n) {
    this._Flags = n;
    this._htmlElement.innerHTML = this._formated(n);
  }
}
