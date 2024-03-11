export default async (manager) => {
  const screen = await manager.screenElementFactory.createScreenFromPath(
    import.meta.url,
    {
      init: function init() {
        manager._loadGames();
      },
    }
  );
  return screen;
};
