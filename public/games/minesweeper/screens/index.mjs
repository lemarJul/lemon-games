const SCREEN = document.querySelector("#MineSweeper");

export default function () {
  const startButton = SCREEN.querySelector("#MineSweeper .new-game");
  startButton.addEventListener("click", () => {
    this.newGame();
  });

}
