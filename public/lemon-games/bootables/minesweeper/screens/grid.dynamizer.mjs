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
      manager.timer.pause();
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

  //todo: think about how to handle the game controls buttons for each screen
  function initStartButton() {
    manager.buttonController.startButton.addEventListener("click", () => {
      manager.timer.pause();
      manager.screenController.display.minesweeperPaused();
    });
  }
};
