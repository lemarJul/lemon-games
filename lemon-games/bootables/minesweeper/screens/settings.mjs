import { DIFFICULTIES } from "../settings/difficulties.mjs";

export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        renderDifficulty(DIFFICULTIES);
        difficultyToggle.addEventListener("click", toggleDifficulty);
        safeCornersToggle.addEventListener("click", toggleSafeCorners);
      },
    }
  );
  const difficultyToggle = screen.querySelector("#difficultyToggle"),
    safeCornersToggle = screen.querySelector("#safeCornersToggle"),
    radioOn = screen.querySelector("#safeCornersOn"),
    radioOff = screen.querySelector("#safeCornersOff"),
    difficultySelect = screen.querySelector("#difficulty-select"),
    difficultyBody = screen.querySelector("#difficulty-table tbody");

  return screen;

  function renderDifficulty(difficulties) {
    Object.entries(difficulties).forEach(([name, { length, nMines }], i) => {
      addOption(name);
      addTableRow(name, { length, nMines });
      if (i === 0) {
        difficultySelect.selectedIndex = i;
        difficultyBody.querySelector("tr").classList.add("active");
      }
    });
  }
  function addOption(name) {
    const option = document.createElement("option");
    option.value = name;
    option.id = name;
    option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    difficultySelect.appendChild(option);
  }
  function addTableRow(name, { length, nMines }) {
    const row = document.createElement("tr"),
      header = document.createElement("th"),
      lengthCell = document.createElement("td"),
      nMinesCell = document.createElement("td");

    header.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    lengthCell.textContent = `${length}x${length} grid`;
    nMinesCell.textContent = `${nMines} mines`;
    row.appendChild(header);
    row.appendChild(lengthCell);
    row.appendChild(nMinesCell);
    difficultyBody.appendChild(row);
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
};
