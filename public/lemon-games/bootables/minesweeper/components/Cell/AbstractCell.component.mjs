export default class AbstractCell extends HTMLButtonElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;

    this.registerEventListeners([
      {
        event: "click",
        listener: this._revealHandler,
        options: { once: true },
      },
      // following are two separate event listeners to allow removing the toggleFlagged listener but keeping the preventDefault listener
      { event: "contextmenu", listener: (e) => e.preventDefault() },
      { event: "contextmenu", listener: this._toggleFlagged },
    ]);

    this.classList.add("grid-item");
  }
  // EVENT LISTENERS

  registerEventListeners(eventListeners) {
    eventListeners.forEach(({ event, listener, options }) => {
      this.addEventListener(event, listener, options);
    });
  }

  _revealHandler() {
    if (this._isFlagged()) this._toggleFlagged();
    this.removeEventListener("contextmenu", this._toggleFlagged);
    this._reveal();
  }
  _reveal() {
    console.log("revealing", this);
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
