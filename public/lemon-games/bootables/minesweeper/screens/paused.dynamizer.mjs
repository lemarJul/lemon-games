export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        initResumeButton();
      },
    }
  );
  return screen;

  function initResumeButton() {
    const resumeButton = screen.querySelector("#resume-button");

    const resumeGame = () => {
      manager.screenController.display.minesweeperGrid();
      manager.timer.run();
    };
    resumeButton.addEventListener("click", resumeGame);
  }

};
