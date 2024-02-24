export default {
  controls: {
    get settingsButton() {
      return document.getElementById("secondary-button");
    },
    get primaryButton() {
      return document.getElementById("primary-button");
    },
    get secondaryButton() {
      return document.getElementById("secondary-button");
    },
    get leftButton() {
      return document.getElementById("left-button");
    },
    get rightButton() {
      return document.getElementById("right-button");
    },
    get startButton() {
      return document.getElementById("start-button");
    },
  },

  get display() {
    return document.getElementById("display");
  },
  get powerButton() {
    return document.getElementById("power-button");
  },
  get consoleContainer() {
    return document.getElementById("console-container");
  },
};
