export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        initTryAgainButton();
      },
    }
  );
  return screen;

  function initTryAgainButton() {
    const tryAgainButton = screen.querySelector("#try-again-button");

    tryAgainButton.addEventListener("click", () => {
      manager.newGame();
    });
  }
};
