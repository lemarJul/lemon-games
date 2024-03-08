//TODO: display score position in the page

export const createConnectedCallback = (manager) => {
  return function () {
    const nameInput = this.querySelector("#name-submit"),
      form = this.querySelector("form"),
      timeDisplay = this.querySelector("#time-result");

    // update the time display
    const displayTimer = () => {
      const time = manager.timer.getTime();
      timeDisplay.textContent = time;
    };

    const displayForm = () => {
      form.removeAttribute("hidden");
    };

    const hideSubmitMessages = () => {
      this.querySelectorAll(".submit-message").forEach((el) =>
        el.setAttribute("hidden", "")
      );
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
    ).observe(this);

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
        this.querySelector("#success-message").removeAttribute("hidden");
      } catch (error) {
        console.error(error);
      }
    });
  };
};

export const path = import.meta.url;

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
    this.querySelectorAll(".submit-message").forEach((el) =>
      el.setAttribute("hidden", "")
    );
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
        this.querySelector("#success-message").removeAttribute("hidden");
      } catch (error) {
        console.error(error);
      }
    });
  }
};
