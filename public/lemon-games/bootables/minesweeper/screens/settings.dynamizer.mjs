import GridFactory from "../components/Grid/GridFactory.mjs";
console.log(GridFactory.difficulties);

export default function (screen) {
  const difficultyToggle = screen.querySelector("#difficultyToggle");
  const safeCornersToggle = screen.querySelector("#safeCornersToggle");
  const radioOn = screen.querySelector("#safeCornersOn");
  const radioOff = screen.querySelector("#safeCornersOff");
  const difficultySelect = screen.querySelector("#difficulty-select");
  const difficultyBody = screen.querySelector("#difficulty-table tbody");

  renderDifficulty(GridFactory.difficulties);
  difficultyToggle.addEventListener("click", toggleDifficulty);
  safeCornersToggle.addEventListener("click", toggleSafeCorners);

  function renderDifficulty(difficulties) {
    const addOption = (name) => {
      const option = document.createElement("option");
      option.value = name;
      option.id = name;
      option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      difficultySelect.appendChild(option);
    };
    const addTableRow = (name, { length, nMines }) => {
      const row = document.createElement("tr");
      const header = document.createElement("th");
      const lengthCell = document.createElement("td");
      const nMinesCell = document.createElement("td");
      header.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      lengthCell.textContent = `${length}x${length}`;
      nMinesCell.textContent = `${nMines} mines`;
      row.appendChild(header);
      row.appendChild(lengthCell);
      row.appendChild(nMinesCell);
      difficultyBody.appendChild(row);
    };

    Object.entries(difficulties).forEach(([name, { length, nMines }], i) => {
      addOption(name);
      addTableRow(name, { length, nMines });
      if (i === 0) {
        difficultySelect.selectedIndex = i;
        difficultyBody.querySelector("tr").classList.add("active");
      }
    });
  }

  function toggleSafeCorners() {
    radioOn.checked ? (radioOff.checked = true) : (radioOn.checked = true);
  }
  function toggleDifficulty() {
    const difficultyDetails = screen.querySelectorAll("#difficulty-table tr");

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
