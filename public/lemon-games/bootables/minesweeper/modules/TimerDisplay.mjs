import SquareGrid from "../components/Grid/SquareGridElement.mjs";

export default class TimerDisplay {
  constructor(HTMLElement) {
    this.wrappedElement = HTMLElement;
    this.defaultTime = "000";
    this.time = this.defaultTime;
    this.registerListerners();
  }
  registerListerners() {
    this.wrappedElement
      .getRootNode()
      .addEventListener(SquareGrid.events.started, this.run.bind(this));
    this.wrappedElement
      .getRootNode()
      .addEventListener("gameStopped", this.stop.bind(this));
    this.wrappedElement
      .getRootNode()
      .addEventListener("gameReset", this.reset.bind(this));
  }

  run() {
    this.interval = setInterval(this.incrementTimer.bind(this), 1000);
  }

  incrementTimer() {
    this.time += 1;
    const formated = ("00" + this.time).slice(-3);
    this.wrappedElement.innerHTML = formated;
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    this.stop();
    this.time = 0;
    this.wrappedElement.innerHTML = this.defaultTime;
  }

  getTime() {
    return this.time;
  }
}
