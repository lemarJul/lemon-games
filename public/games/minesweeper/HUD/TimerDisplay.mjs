export default class TimerDisplay {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.defaultTime = "000";
    this.time = this.defaultTime;
    this.registerListerners();
  }
  registerListerners() {
    document.addEventListener("gameStarted", this._start.bind(this));
    document.addEventListener("gameStopped", this.stop.bind(this));
    document.addEventListener("gameReset", this.reset.bind(this));
  }

  _start() {
      this.interval = setInterval(this.incrementTimer.bind(this), 1000);
  }

  incrementTimer() {
    this.time += 1;
    const formated = ("00" + this.time).slice(-3);
    this.htmlElement.innerHTML = formated;
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    this.time = 0;
    this.htmlElement.innerHTML = this.defaultTime;
  }

  getTime() {
    return this.time;
  }
 
}
