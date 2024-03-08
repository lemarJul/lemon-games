import SquareGrid from "../components/Grid/SquareGridElement.mjs";

export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        initGridWin();
        initGridFail();
        initStartButton();
      },
    }
  );
  return screen;

  function initGridWin() {
    screen.addEventListener(SquareGrid.events.complete, () => {
      manager.screenController.display.minesweeperWin();
      manager.timer.stop();
    });
  }

  function initGridFail() {
    screen.addEventListener(SquareGrid.events.stopped, () => {
      manager.soundController.play.boom();
      setTimeout(() => {
        manager.screenController.display.minesweeperFail();
      }, 1500);
    });
  }

  function initStartButton() {
    manager.buttonController.startButton.addEventListener("click", () => {
      manager.timer.stop();
      manager.screenController.display.minesweeperPaused();
    });
  }
};
