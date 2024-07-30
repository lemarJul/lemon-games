import SafeCell from "./SafeCell.component.mjs";
import MineCell from "./MineCell.component.mjs";

const cellEvents = {
  ...SafeCell.events,
  ...MineCell.events,
};

export { SafeCell, MineCell, cellEvents };
