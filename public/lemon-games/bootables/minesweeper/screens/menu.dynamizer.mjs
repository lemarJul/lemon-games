export default function (screen) {
  const listeners = {
    "new game": () => {
      this.newGame();
    },
  };

  const hooked =
    this.screenController.wrappedElement.querySelectorAll("[data-js-hook]");

  hooked.forEach((el) => {
    const hookName = el.getAttribute("data-js-hook");
    const [event, action] = hookName.split(":");

    if (action in listeners) {
      el.addEventListener(event, listeners[action]);
    } else {
      console.warn("unknown action", hookName, " -", el);
    }
  });
}
