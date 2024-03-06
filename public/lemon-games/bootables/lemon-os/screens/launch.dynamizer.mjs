export const path = import.meta.url;

export const createConnectedCallback = (manager) => {
  return function () {
    const displayNextScreen = () => {
      manager.soundController.play.start();
      setTimeout(() => {
        manager.screenController.display.mainMenu();
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
