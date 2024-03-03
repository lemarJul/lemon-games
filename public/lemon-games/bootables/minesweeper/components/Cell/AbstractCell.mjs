export default class AbstractCell extends HTMLButtonElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;

    const eventListeners = [
      { event: "contextmenu", listener: this._preventDefaultHandler },
      {
        event: "click",
        listener: this._revealHandler,
        options: { once: true },
      },
      { event: "contextmenu", listener: this._toggleFlagged },
    ];

    this.registerEventListeners(eventListeners);
    this.classList.add("grid-item");
  }
  // EVENT LISTENERS

  registerEventListeners(eventListeners) {
    eventListeners.forEach(({ event, listener, options }) => {
      this.addEventListener(event, listener, options);
    });
  }
  _preventDefaultHandler(e) {
    e.preventDefault();
  }

  _revealHandler() {
    if (this._isFlagged()) this._toggleFlagged();
    this.removeEventListener("contextmenu", this._toggleFlagged);
    this._reveal();
  }
  _reveal() {
    this.classList.add("revealed");
  }

  _isFlagged() {
    return this.classList.contains("flagged");
  }
  _toggleFlagged() {
    this.classList.toggle("flagged");
    this.dispatchEvent(
      new Event(AbstractCell.events.flagToggled, { bubbles: true })
    );
  }
  static get events() {
    return { flagToggled: "lg-flag-toggled" };
  }
}
