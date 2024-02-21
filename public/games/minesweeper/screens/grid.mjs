export default function () {
  // game stopped
  document.addEventListener("gameStopped", () => {
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
  document.addEventListener("cellAction", () => {
    if (this.started) return;
    this.started = true;
    document.dispatchEvent(new Event("gameStarted"));
    console.log(`${this.constructor.name}: onGameStarted`);
  });
}

function toggleSettingsPanel_onSettingsButtonClicked() {
  this.htmlElements.startButton.addEventListener("click", () => {
    console.log(`${this.constructor.name}: Settings Button Clicked`);
    this.screenController.display.settings();
  });
}

function gameWon_onGameWonEvent() {
  document.addEventListener("gridComplete", () => {
    console.log(`${this.constructor.name}: onGameWon`);
    this.screenController.display.win();
    this.timer.stop();
  });
}

