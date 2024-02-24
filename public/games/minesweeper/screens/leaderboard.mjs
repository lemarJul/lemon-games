export default async function () {
  const SCREEN = document.querySelector("#leaderboard");
  const DIFFICULTIES = ["easy", "medium", "hard"];
  const gameScores = await this.dataController.getData() ;

  const fillTableWithScores = async () => {
    const sortedScores = gameScores.sort((a, b) => b.score - a.score);

    const scoresByDifficulty = sortedScores.reduce(
      (acc, score) => {
        if (!DIFFICULTIES.includes(score.difficulty))
          throw new Error(`Invalid difficulty: ${score.difficulty}`);

        const i = DIFFICULTIES.indexOf(score.difficulty);
        acc[i].push(score);
        return acc;
      },
      DIFFICULTIES.map((diff) => [])
    );

    const top5ByDifficulty = scoresByDifficulty.map((scores) =>
      scores.slice(0, 5)
    );

    insertBodiesContent(top5ByDifficulty);

    SCREEN.querySelector("#medium-body").classList.add("disabled");
    SCREEN.querySelector("#hard-body").classList.add("disabled");
  };

  const insertBodiesContent = ([easyTop5, mediumTop5, hardTop5]) => {
    const table = SCREEN.querySelector("table");
    const tableBodies = table.querySelectorAll("tbody");
    console.log(tableBodies);

    [easyTop5, mediumTop5, hardTop5].forEach((top5, i) =>
      top5.map(createTableRow).forEach((row) => tableBodies[i].appendChild(row))
    );
  };

  const createTableRow = (score, i) => {
    score.rank = i + 1;
    const scoreTemplate = document.querySelector("#score-template");
    const clone = scoreTemplate.content.cloneNode(true);

    clone.querySelector(".rank").textContent = score.rank;
    clone.querySelector(".name").textContent = score.name;
    clone.querySelector(".score").textContent = score.score;
    return clone;
  };

  const registerEventListeners = () => {
    const buttons = SCREEN.querySelector("#leaderboard-toggle button");
    buttons.addEventListener("click", toggleLeaderboardBody);
  };

  const toggleLeaderboardBody = (e) => {
    const toggleButton = e.target;
    const tBodies = SCREEN.querySelectorAll("#leaderboard tbody");
    const activeIndex = Array.from(tBodies).findIndex(
      (tBody) => !tBody.classList.contains("disabled")
    );
    const nextIndex = (activeIndex + 1) % tBodies.length;

    tBodies.forEach((tbody, i) => {
      i === nextIndex
        ? tbody.classList.remove("disabled")
        : tbody.classList.add("disabled");
    });

    toggleButton.textContent = DIFFICULTIES[nextIndex];
  };

  registerEventListeners();
  fillTableWithScores();
}
