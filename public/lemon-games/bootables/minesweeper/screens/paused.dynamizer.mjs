export default function (screen) {
  const resumeButton = screen.querySelector("#resume-button");

  const resumeGame = () => {
      this.screenController.display.grid();
      this.timer.run();
  };
  resumeButton.addEventListener("click", resumeGame);
}
