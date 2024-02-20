export default class CellAbstract extends HTMLButtonElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this._revealed = false;
    this._flagged = false;

    const eventListeners = [
      { event: "click", listener: this.onClick },
      { event: "contextmenu", listener: this.onRightClick },
    ];

    this.registerEventListeners(eventListeners);
    this.classList.add("grid-item");
  }
  // EVENT LISTENERS

  registerEventListeners(eventListeners) {
    eventListeners.forEach(({ event, listener }) => {
      this.addEventListener(event, listener);
    });
  }
  onClick() {
    console.log("clicked: ", this);

    if (this.isFlagged()) this._toggleFlagged();
    if (this.isRevealed()) return;
    this.reveal();
  }
  onRightClick(event) {
    event.preventDefault();
    console.log("right click");
    if (this.isRevealed()) return;
    this._toggleFlagged();
  }

  // STATE
  isRevealed() {
    return this.classList.contains("revealed");
  }
  reveal() {
    this.classList.add("revealed");
    this.dispatchEvent(new Event("cellRevealed", { bubbles: true }));
  }
  isFlagged() {
    return this.classList.contains("flagged");
  }
  _toggleFlagged() {
  this.classList.toggle("flagged")
    this.dispatchEvent(new Event("flagToggled", { bubbles: true }));
  }
}
