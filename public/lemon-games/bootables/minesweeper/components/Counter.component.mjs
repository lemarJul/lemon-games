import { Component } from "../../../modules/Component.mjs";

const html = `
  <span  name=count></span=>
`;

export default Component.define(
  "counter-component",
  class Counter extends HTMLElement {
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
);
