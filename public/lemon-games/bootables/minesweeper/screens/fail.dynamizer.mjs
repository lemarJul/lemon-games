export default function (screen) {
  const tryAgainButton = screen.querySelector("#try-again-button");

  tryAgainButton.addEventListener("click", () => {
    this.newGame();
  });
}
