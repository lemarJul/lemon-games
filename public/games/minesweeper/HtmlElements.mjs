export default class HTMLElementsProvider {
  static get gameContainer() {
    return document.getElementById("game-container");
  }
  static get settingsButton() {
    return document.getElementById("secondary-button");
  }
  static get settingsPanel() {
    return document.getElementById("settings-panel");
  }
  static get difficulty() {
    return document.querySelector("#difficulty-select");
  }
  static get safeCorners() {
    return document.getElementById("safe-corners");
  }
  static get timer() {
    return document.getElementById("timer");
  }
  static get  bombCounter() {
    return document.getElementById("bomb-counter");
  }
  static get gridContainer() {
    return document.getElementById("grid-container");
  }
  static getCell(x, y) {
    return document.getElementById(`x-y`);
  }
  static get highScorePanel() {
    return document.getElementById("high-score-panel");
  }
  static get victoryPanel() {
    return document.getElementById("victory-panel");
  }
  static get failPanel() {
    return document.getElementById("fail");
  }
  static get tryAgainButton() {
    return document.getElementById("try-again-button");
  }
  static get startButton() {
    return document.getElementById("start-button");
  }
}
