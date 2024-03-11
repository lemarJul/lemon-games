//TODO: display score position in the page

export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        initNameInput();
        initFormSubmit();
        screen.onSelfShown(() => {
          displayTimer();
          displayForm();
          hideSubmitMessages();
          form.reset();
        });
      },
    }
  );
  const nameInput = screen.querySelector("#name-submit"),
    form = screen.querySelector("form"),
    timeDisplay = screen.querySelector("#time-result");

  return screen;

  function displayTimer() {
    const time = manager.timer.getTime();
    timeDisplay.textContent = time;
  }

  function displayForm() {
    form.removeAttribute("hidden");
  }

  function hideSubmitMessages() {
    screen
      .querySelectorAll(".submit-message")
      .forEach((el) => el.setAttribute("hidden", ""));
  }
  function initNameInput() {
    checkEmptyState({ target: nameInput });
    nameInput.addEventListener("input", checkEmptyState);
  }

  function checkEmptyState({ target }) {
    if (target.value.length > 0) {
      target.classList.remove("empty");
    } else {
      target.classList.add("empty");
    }
  }

  function initFormSubmit() {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = nameInput.value;
      const score = manager.timer.getTime().toString();
      const difficulty = manager.HTMLElements.difficulty.value;
      try {
        const res = await manager.dataController.setData({
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
};
