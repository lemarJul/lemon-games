import Grid from "./Grid/Grid.component.mjs";

export default class FlagCounter {
  constructor(htmlElement) {
    this._htmlElement = htmlElement;
    this._registerEventListeners();
  }

  get countDown() {
    return this._countDown;
  }

  set countDown(n) {
    this._countDown = n;
    this._htmlElement.innerText = this._formated(n);
  }

  _registerEventListeners() {
    const rootNode = this._htmlElement.getRootNode();
    rootNode.addEventListener(Grid.events.flagToggled, this._update.bind(this));
  }

  _update(e) {
    const cell = e.target;
    const isFlagged = cell.classList.contains("flagged");

    isFlagged ? this.countDown-- : this.countDown++;
  }

  _formated(n) {
    return ("00" + n).slice(-2);
  }
}
