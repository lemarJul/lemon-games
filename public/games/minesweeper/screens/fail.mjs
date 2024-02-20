export default function () {
  _onResetButtonClicked.bind(this)();
}

function _onResetButtonClicked() {
  this.htmlElements.tryAgainButton.addEventListener("click", () => {
    this.newGame();
  });
}
