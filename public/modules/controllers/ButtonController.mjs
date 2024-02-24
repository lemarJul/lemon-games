import AbstractController from "./AbstractController.mjs";
import HTML from "../HtmlProvider.js";
const { controls : ButtonElements } = HTML;

export default class ButtonController extends AbstractController {
  constructor() {
    super();
    // this.resetButton = document.getElementById('resetButton');
    // this.resetButton.addEventListener('click', () => {
    //     this.startButton.disabled = false;
    //     this.grid.reset();
    // });
    // this.difficultyButtons = document.querySelectorAll('.difficulty');
    // this.difficultyButtons.forEach((button) => {
    //     button.addEventListener('click', (event) => {
    //         this.difficultyButtons.forEach((button) => button.classList.remove('active'));
    //         event.target.classList.add('active');
    //         this.grid.difficulty = event.target.getAttribute('data-difficulty');
    //     });
    // });
  }

  mapButtons(Mapping) {
    for (const controlID in Mapping) {
      if (controlID in ButtonElements) {
        try {
          const button = ButtonElements[controlID];
          const handler = Mapping[controlID];
          // todo: removeEventListener
          button.addEventListener('click', Mapping[controlID]);
        } catch (error) {
          error.message = `Failed to add event listener to ${controlID} button`;
          console.error(error);
        }
      }
    }
  }

  // registerEventListeners() {
  //   document.addEventListener("gameStopped", () => {
  //     this.gameObject.grid.forEach((row) => {
  //       row.forEach((cell) => {
  //         cell.disabled = true;
  //       });
  //     });
  //   });
  // }
}
