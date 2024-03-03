import AbstractController from "./AbstractController.mjs";

//TODO implement enable and disable methods
export default class ButtonController extends AbstractController {
  constructor(HTMLElement) {
    super(HTMLElement);
  }

  mapButtons(Mapping) {
    for (const controlID in Mapping) {
      if (controlID in this) {
        try {
          const button = this[controlID];
          const handler = Mapping[controlID];
          // todo: removeEventListener
          button.addEventListener("click", Mapping[controlID]);
        } catch (error) {
          error.message = `Failed to add event listener to ${controlID} button`;
          console.error(error);
        }
      } else {
        console.error(
          `ButtonController: No button found with id ${controlID}`,
          this
        );
      }
    }
  }
}
