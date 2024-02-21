export default function () {
  const startButton = document.querySelector("#MineSweeper .new-game");
  startButton.addEventListener("click", () => {
    this.newGame();
  });
}
