export const path = import.meta.url;

export const createConnectedCallback = (manager) => {
  return function () {
    const displayNextScreen = () => {
      manager.soundController.play.start();
      setTimeout(() => {
        const nextScreenId = manager.name.toLowerCase() + "-mainMenu";
        manager.screenController.display[nextScreenId]();
      }, 3000);
    };

    new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true) {
          displayNextScreen();
        }
      },
      { threshold: [0] }
    ).observe(this);
  };
};
