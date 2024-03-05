import AbstractCell from "./AbstractCell.mjs";

export default class MineCellElement extends AbstractCell {
  constructor(x, y) {
    super(x, y);

    // this.addEventListener("click", this.boom);
  }
  //Method Overriding
  _reveal() {
    super._reveal();
    this.classList.add("mine");
    this.dispatchEvent(new Event(MineCellElement.events.exploded, { bubbles: true }));
  }

  static get events() {
    const events = super.events;
    events.exploded = "lg-mine-exploded";
    return events;
  }
  static get tag() {
    return "mine-cell";
  }
}
if (!customElements.get(MineCellElement.tag)) {
  customElements.define(MineCellElement.tag, MineCellElement, { extends: "button" });
}
