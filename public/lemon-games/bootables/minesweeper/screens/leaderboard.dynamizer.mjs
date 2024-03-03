export default async function (screen) {
  const table = screen.querySelector("table");
  const tableBodies = table.querySelectorAll("tbody");
  const mediumBodyTable = tableBodies.item(1);
  const hardBodyTable = tableBodies.item(2);
  const scoreTemplate = screen.querySelector("#score-template");
  const buttons = screen.querySelector("menu-button[toggle]");
  const DIFFICULTIES = ["easy", "medium", "hard"];

  const FillLeaderBoard = async () => {
    const [top5Easy, top5Medium, top5Hard] = await fetchTop5byDifficulties();
    fillTableWithScores([top5Easy, top5Medium, top5Hard]);
  };

  const fetchTop5byDifficulties = async () => {
    const gameScores = await this.dataController.getData();
    const sortedScores = gameScores.sort((a, b) => a.score - b.score);
    const [scoresEasy, scoresMedium, scoresHard] = sortedScores.reduce(
      (acc, score) => {
        if (!DIFFICULTIES.includes(score.difficulty))
          throw new Error(`Invalid difficulty: ${score.difficulty}`);

        const i = DIFFICULTIES.indexOf(score.difficulty);
        acc[i].push(score);
        return acc;
      },
      DIFFICULTIES.map((diff) => [])
    );
    const [top5Easy, top5Medium, top5Hard] = [
      scoresEasy,
      scoresMedium,
      scoresHard,
    ].map((scores) => scores.slice(0, 5));

    return [top5Easy, top5Medium, top5Hard];
  };

  const fillTableWithScores = ([top5Easy, top5Medium, top5Hard]) => {
    [top5Easy, top5Medium, top5Hard].forEach((top5, i) =>
      top5.map(createTableRow).forEach((row) => tableBodies[i].appendChild(row))
    );
  };

  const createTableRow = (score, i) => {
    score.rank = i + 1;

    const clone = scoreTemplate.content.cloneNode(true);
    clone.querySelector(".rank").textContent = score.rank;
    clone.querySelector(".name").textContent = score.name;
    clone.querySelector(".score").textContent = score.score;
    return clone;
  };

  const toggleLeaderboardBody = (e) => {
    const activeBodyIndex = Array.from(tableBodies).findIndex(
      (tBody) => !tBody.classList.contains("disabled")
    );
    const nextBodyIndex = (activeBodyIndex + 1) % tableBodies.length;

    tableBodies.forEach((tBody, i) => {
      i === nextBodyIndex
        ? tBody.classList.remove("disabled")
        : tBody.classList.add("disabled");
    });

    e.target.textContent = DIFFICULTIES[nextBodyIndex];
  };

  FillLeaderBoard();
  mediumBodyTable.classList.add("disabled");
  hardBodyTable.classList.add("disabled");
  buttons.addEventListener("click", toggleLeaderboardBody);
}
