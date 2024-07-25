export default (parentNode) => {
  return class DescendantsProvider {
    static get gameContainer() {
      return parentNode.getElementById("game-container");
    }
    static get settingsPanel() {
      return parentNode.getElementById("settings-panel");
    }
    static get difficulty() {
      return parentNode.querySelector("#difficulty-select");
    }
    static get safeCorners() {
      return parentNode.querySelector("[name=safeCorners]:checked");
    }
    static get timer() {
      return parentNode.querySelector("minesweeper-timer");
    }

    static getCell(x, y) {
      return parentNode.getElementById(`x-y`);
    }
    static get highScorePanel() {
      return parentNode.getElementById("high-score-panel");
    }
    static get victoryPanel() {
      return parentNode.getElementById("victory-panel");
    }
    static get failPanel() {
      return parentNode.getElementById("fail");
    }
    static get tryAgainButton() {
      return parentNode.getElementById("try-again-button");
    }
    static get startButton() {
      return parentNode.getElementById("start-button");
    }
    static get settingsButton() {
      return parentNode.getElementById("secondary-button");
    }
    static get display() {
      return parentNode.querySelector("#display");
    }
    // static get powerButton() {
    //   return parentNode.querySelector("#power-button");
    // }
    static get leftButton() {
      return parentNode.querySelector("#left-button");
    }
    static get rightButton() {
      return parentNode.querySelector("#right-button");
    }
    static get primaryButton() {
      return parentNode.querySelector("#primary-button");
    }
    static get secondaryButton() {
      return parentNode.querySelector("#secondary-button");
    }
    static get flagCounter() {
      return parentNode.querySelector("flag-counter");
    }
  };
};

export const nextProvider = (parentNode) => {
  return class newDescendantsProvider {
    static register(descendants) {
      for (const [key, selector] of Object.entries(descendants)) {
        Object.defineProperty(newDescendantsProvider, key, {
          get() {
            return parentNode.querySelector(selector);
          },
        });
      }
    }
  };
};
