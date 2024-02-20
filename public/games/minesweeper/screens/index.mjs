export default function() {

  const startButton = document.querySelector("#MineSweeper .new-game");
  startButton.addEventListener("click", () => {
    this.newGame();
  });

  const exitButton = document.querySelector("#MineSweeper .exit");
  exitButton.addEventListener("click", this.screenController.display.mainMenu);

  const leaderboardButton = document.querySelector("#MineSweeper .leaderboard");
  leaderboardButton.addEventListener(
    "click",
    this.screenController.display.leaderboard
  );

  const settingsButton = document.querySelector("#MineSweeper .settings");
  settingsButton.addEventListener(
    "click",
    this.screenController.display.settings
  );

  const mineSweeperButtons = document.querySelectorAll("button.MineSweeper");
  mineSweeperButtons.forEach((button) => {
    button.addEventListener("click", this.screenController.display.MineSweeper);
  });
}
