import { canStaticRegisterAsComponent } from "../../../mixins/componentMixins.mjs";
export default class Counter extends canStaticRegisterAsComponent(HTMLElement) {
  static _tagName = "counter-component";
  static get observedAttributes() {
    return ["value"];
  }
  constructor(value = 0) {
    super();
    this.value = value;
  }
  increment() {
    this.value++;
  }
  decrement() {
    this.value--;
  }
  get value() {
    return this.getAttribute("value");
  }
  set value(n) {
    this.setAttribute("value", n);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.innerText = this.#formated(newValue);
  }
  #formated(n) {
    return ("00" + n).slice(-2);
  }
}
Counter.registerAsComponent();