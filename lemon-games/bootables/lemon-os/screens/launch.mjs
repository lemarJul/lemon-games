export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        manager.screenController.bootScreen = screen;
        screen.onSelfShown(AnimateToNextScreen);
      },
    }
  );
  return screen;

  function AnimateToNextScreen() {
    manager.soundController.play.start();
    setTimeout(() => {
      manager.screenController.display("lemonos-menu");
    }, 3000);
  }
};
