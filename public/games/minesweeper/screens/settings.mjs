export default function () {
  const difficultyToggle = document.querySelector("#difficultyToggle");
  difficultyToggle.addEventListener("click", toggleDifficulty);

  const safeCornersToggle = document.querySelector("#safeCornersToggle");
  safeCornersToggle.addEventListener("click", toggleSafeCorners);
}

function toggleSafeCorners() {
  var radioOn = document.getElementById("safeCornersOn");
  var radioOff = document.getElementById("safeCornersOff");

  if (radioOn.checked) {
    radioOff.checked = true;
  } else {
    radioOn.checked = true;
  }
}

function toggleDifficulty() {
  const difficultySelect = document.querySelector("#difficulty-select");
  const difficultyDetails = document.querySelectorAll("#difficulty-table tr");

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
