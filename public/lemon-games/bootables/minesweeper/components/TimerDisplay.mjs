import Grid from "./Grid/Grid.component.mjs";

export default class TimerDisplay {
  constructor(
    HTMLElement,
    { startEvent = Grid.events.started, stopEvent = Grid.events.stopped } = {}
  ) {
    this.wrappedElement = HTMLElement;
    this.defaultTime = 0;
    this.time = this.defaultTime;
    this.observedEvents = {
      start: startEvent,
      stop: stopEvent,
    };

    this._registerListeners();
  }
  get time() {
    return this._time;
  }

  set time(val) {
    this.render((this._time = val));
  }

  render(val) {
    this.wrappedElement.innerHTML = this._formatedTime(val);
  }

  _formatedTime(value) {
    return ("00" + value.toString()).slice(-3);
  }

  _registerListeners() {
    this.wrappedElement
      .getRootNode()
      .addEventListener(this.observedEvents.start, this.run.bind(this));
    this.wrappedElement
      .getRootNode()
      .addEventListener(this.observedEvents.stop, this.pause.bind(this));
  }

  run() {
    this.interval = setInterval(this._incrementTimer.bind(this), 1000);
  }

  _incrementTimer() {
    this.time += 1;
  }

  pause() {
    clearInterval(this.interval);
  }

  resume() {
    if (this._time) {
      this.run();
    }
  }

  reset() {
    this.pause();
    this.time = this.defaultTime;
  }

  getTime() {
    return this.time;
  }
}
