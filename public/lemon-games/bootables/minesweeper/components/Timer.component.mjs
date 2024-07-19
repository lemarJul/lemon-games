import { canStaticRegisterAsComponent } from "../../../mixins/componentMixins.mjs";
export default class Timer extends canStaticRegisterAsComponent(HTMLElement) {
  static _tagName = "timer-component";
  #start;
  #time;
  #interval;
  #step;
  #eventListeners;
  #running = false;
  constructor(
    { start = 0, step = 1 } = {
      start: 0,

      step: 1,
    }
  ) {
    super();
    this.time = this.#start = this.getAttribute("start") ?? start;
    this.#step = this.getAttribute("step") ?? step;
    this.eventListeners = [];
  }
  get time() {
    return this.#time;
  }

  set time(value) {
    this.#time = value;
    this.innerHTML = this.formatedTime;
  }

  get formatedTime() {
    return ("00" + this.#time.toString()).slice(-3);
  }

  run() {
    if (!this.#running) {
      this.#interval = setInterval(() => (this.time += this.#step), 1000);
      this.#running = true;
    }
  }
  pause() {
    clearInterval(this.#interval);
    this.#running = false;
  }
  reset() {
    this.pause();
    this.time = this.#start;
  }
}
Timer.registerAsComponent();
