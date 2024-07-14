export default class AbstractController {
  constructor(HTMLElement) {
    this.wrappedElement = HTMLElement;
    this.isOn = false;
  }
  enable() {
    this.isOn = true;
  }
  disable() {
    this.isOn = false;
  }

  exposeElements(elementsToExpose) {
    const addGetter = ([selector, key]) => {
      Object.defineProperty(this, key, {
        get: function () {
          return this.wrappedElement.querySelector(selector);
        },
      });
    };

    elementsToExpose.forEach(addGetter);
  }
}
