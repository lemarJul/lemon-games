const SCREEN = document.querySelector("#grid");

export default function () {
  // game stopped
  SCREEN.addEventListener("gameStopped", () => {
    this.soundController.play.boom();
    setTimeout(() => {
      this.screenController.display.fail();
    }, 1000);
  });

  dispatchGameStarted_onCellActionEvent.bind(this)();
  toggleSettingsPanel_onSettingsButtonClicked.bind(this)();
  gameWon_onGameWonEvent.bind(this)();
}

function dispatchGameStarted_onCellActionEvent() {
  SCREEN.addEventListener("cellAction", () => {
    if (this.started) return;
    this.started = true;
    SCREEN.dispatchEvent(new Event("gameStarted"), { bubbles: true });
    console.log(`${this.constructor.name}: onGameStarted`);
  });
}

function toggleSettingsPanel_onSettingsButtonClicked() {
  this.htmlElements.startButton.addEventListener("click", () => {
    console.log(`${this.constructor.name}: Settings Button Clicked`);
    this.screenController.display.MineSweeper();
  });
}

function gameWon_onGameWonEvent() {
  SCREEN.addEventListener("gridComplete", () => {
    console.log(`${this.constructor.name}: onGameWon`);
    this.screenController.display.win();
    this.timer.stop();
  });
}

