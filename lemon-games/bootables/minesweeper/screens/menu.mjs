export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        catchHook();
      },
    }
  );
  return screen;

  function catchHook() {
    const listeners = {
      "new game": () => {
        manager.newGame();
      },
    };

    const hooked =
      manager.screenController.querySelectorAll(
        "[data-js-hook]"
      );

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
};
