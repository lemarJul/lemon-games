export default class AbstractController {
  constructor() {
    this.isOn = false;
  }
  enable() {
    this.isOn = true;
  }
  disable() {
    this.isOn = false;
  }
}
