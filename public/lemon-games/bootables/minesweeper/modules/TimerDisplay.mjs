import SquareGrid from "../components/Grid/SquareGridElement.mjs";
console.log(SquareGrid.events);
export default class TimerDisplay {
  constructor(HTMLElement) {
    this.wrappedElement = HTMLElement;
    this.defaultTime = 0;
    this.time = this.defaultTime;
    this._registerListerners();
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

  _registerListerners() {
    this.wrappedElement
      .getRootNode()
      .addEventListener(SquareGrid.events.started, this.run.bind(this));
    this.wrappedElement
      .getRootNode()
      .addEventListener(SquareGrid.events.stopped, this.pause.bind(this));
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
