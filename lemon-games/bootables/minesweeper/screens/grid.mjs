import SquareGrid from "../components/Grid/SquareGridElement.mjs";
import TimerDisplay from "../components/TimerDisplay.mjs";
import FlagCounter from "../modules/FlagCounter.mjs";
import GridElementFactory from "../components/Grid/GridElementFactory.mjs";

export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        screen.timer = new TimerDisplay(manager.HTMLElements.timer);
        screen.flagCounter = new FlagCounter(manager.HTMLElements.flagCounter);
        screen.newGame = newGame;

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
      screen.timer.pause();
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
      screen.timer.pause();
      manager.screenController.display.minesweeperPaused();
    });
  }

  function newGame(difficulty, safeCorners) {
    const oldGrid = screen.querySelector("square-grid");
    const newGrid = GridElementFactory.createSquareGrid(
      difficulty,
      safeCorners
    );

    screen.replaceChild(newGrid, oldGrid);
    screen.flagCounter.countDown = newGrid.nMines;
    screen.timer.reset();
    manager.screenController.display.minesweeperGrid();
  }
};
