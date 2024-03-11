export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        const creditsContent = screen.querySelector("#creditsContent");
        creditsContent.innerHTML += creditsContent.innerHTML;
      },
    }
  );
  return screen;
};
