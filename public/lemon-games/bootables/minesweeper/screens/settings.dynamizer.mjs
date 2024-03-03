export default function (screen) {
  const difficultyToggle = screen.querySelector("#difficultyToggle");
  const safeCornersToggle = screen.querySelector("#safeCornersToggle");
  const radioOn = screen.querySelector("#safeCornersOn");
  const radioOff = screen.querySelector("#safeCornersOff");
  const difficultySelect = screen.querySelector("#difficulty-select");
  const difficultyDetails = screen.querySelectorAll("#difficulty-table tr");

  difficultyToggle.addEventListener("click", toggleDifficulty);
  safeCornersToggle.addEventListener("click", toggleSafeCorners);

  function toggleSafeCorners() {
    radioOn.checked ? (radioOff.checked = true) : (radioOn.checked = true);
  }
  function toggleDifficulty() {
    const nextDifficulty =
      (difficultySelect.selectedIndex + 1) % difficultySelect.length;

    difficultySelect.selectedIndex = nextDifficulty;
    difficultyDetails.forEach((detail, index) => {
      detail.classList.remove("active");
      if (index === nextDifficulty) {
        detail.classList.add("active");
      }
    });
  }
}
