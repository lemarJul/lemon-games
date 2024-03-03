export const path = import.meta.url
 
export default function (screen) {
  const displayNextScreen = () => {
    this.soundController.play.start();
    setTimeout(() => {
      this.screenController.display.mainMenu();
    }, 3000);
  };

  new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting === true) {
        displayNextScreen();
      }
    },
    { threshold: [0] }
  ).observe(screen);
}
