import AbstractCell from "./AbstractCell.component.mjs";

export default class MineCell extends AbstractCell {
  constructor(x, y) {
    super(x, y);

    // this.addEventListener("click", this.boom);
  }
  //Method Overriding
  _reveal() {
    super._reveal();
    this.classList.add("mine");
    this.dispatchEvent(new Event(MineCell.events.exploded, { bubbles: true }));
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
if (!customElements.get(MineCell.tag)) {
  customElements.define(MineCell.tag, MineCell, { extends: "button" });
}
