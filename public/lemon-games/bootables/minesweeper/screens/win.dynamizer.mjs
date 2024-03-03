export default function (screen) {
  const nameInput = screen.querySelector("#name-submit");
  const form = screen.querySelector("form");
  const timeDisplay = screen.querySelector("#time-result");
  //TODO: display score position in the page

  // update the time display
  const displayTimer = () => {
    const time = this.timer.getTime();
    timeDisplay.textContent = time;
  };

  const displayForm = () => {
    form.removeAttribute("hidden");
  };

  const hideSubmitMessages = () => {
    screen
      .querySelectorAll(".submit-message")
      .forEach((el) => el.setAttribute("hidden", ""));
  };

  new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting === true) {
        displayTimer();
        displayForm();
        hideSubmitMessages();
        form.reset();
      }
    },
    { threshold: [0] }
  ).observe(screen);

  checkEmptyState({ target: nameInput });
  nameInput.addEventListener("input", checkEmptyState);

  function checkEmptyState({ target }) {
    if (target.value.length > 0) {
      target.classList.remove("empty");
    } else {
      target.classList.add("empty");
    }
  }

  // submit the form
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const score = this.timer.getTime().toString();
    const difficulty = this.HTMLElements.difficulty.value;
    try {
      const res = await this.dataController.setData({
        name,
        score,
        difficulty,
      });
      alert("Score saved!");
      form.reset();
      form.setAttribute("hidden", "");
      screen.querySelector("#success-message").removeAttribute("hidden");
    } catch (error) {
      console.error(error);
    }
  });
}
