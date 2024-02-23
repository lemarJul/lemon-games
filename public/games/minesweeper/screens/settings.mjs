const SCREEN = document.querySelector("#settings");

export default function () {
  const difficultyToggle = SCREEN.querySelector("#difficultyToggle");
  difficultyToggle.addEventListener("click", toggleDifficulty);

  const safeCornersToggle = SCREEN.querySelector("#safeCornersToggle");
  safeCornersToggle.addEventListener("click", toggleSafeCorners);
}

function toggleSafeCorners() {
  var radioOn = SCREEN.querySelector("#safeCornersOn");
  var radioOff = SCREEN.querySelector("#safeCornersOff");

  if (radioOn.checked) {
    radioOff.checked = true;
  } else {
    radioOn.checked = true;
  }
}

function toggleDifficulty() {
  const difficultySelect = SCREEN.querySelector("#difficulty-select");
  const difficultyDetails = SCREEN.querySelectorAll("#difficulty-table tr");

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
