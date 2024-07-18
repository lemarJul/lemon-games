import AbstractCell from "./AbstractCell.component.mjs";

export default class MineCell extends AbstractCell {
  static _tagName = "mine-cell";

  constructor(x, y) {
    super(x, y);
  }

  _reveal() {
    super._reveal();
    this.classList.add("mine");
    this.dispatchEvent(new Event(MineCell.events.exploded, { bubbles: true }));
  }

  static get events() {
    return { ...super.events, exploded: "lg-mine-exploded" };
  }
}
MineCell.registerAsComponent("button");
