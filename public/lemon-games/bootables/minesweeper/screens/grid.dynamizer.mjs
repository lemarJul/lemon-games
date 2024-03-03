import SquareGrid from "../components/Grid/SquareGrid.mjs";

export default function (screen) {
  screen.addEventListener(SquareGrid.events.complete, () => {
    this.screenController.display.win();
    this.timer.stop();
  });

  screen.addEventListener(SquareGrid.events.stopped, () => {
    this.soundController.play.boom();
    setTimeout(() => {
      this.screenController.display.fail();
    }, 1500);
  });

  this.buttonController.startButton.addEventListener("click", () => {
    this.timer.stop();
    this.screenController.display.paused();
  });
}
