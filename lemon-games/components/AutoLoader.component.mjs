import { Component } from "../../../modules/component.mjs";


//https://css-tricks.com/an-approach-to-lazy-loading-custom-elements/

let defer = window.requestIdleCallback || requestAnimationFrame;

export default Component.define(
  "auto-loader",
  class AutoLoader extends HTMLElement {
    connectedCallback() {
      let scope = this.parentNode;
      defer(() => {
        this.discover(scope);
      });
      let observer = (this._observer = new MutationObserver((mutations) => {
        for (let { addedNodes } of mutations) {
          for (let node of addedNodes) {
            defer(() => {
              this.discover(node);
            });
          }
        }
      }));
      observer.observe(scope, { subtree: true, childList: true });
    }

    disconnectedCallback() {
      this._observer.disconnect();
    }

    discover(scope) {
      [scope, ...scope.querySelectorAll(":not(:defined)")].map((el) => {
        this.load(el.tagName);
      });
    }

    load(tag) {
      let el = document.createElement("script");
      let res = new Promise((resolve, reject) => {
        el.addEventListener("load", (ev) => {
          resolve(null);
        });
        el.addEventListener("error", (ev) => {
          reject(new Error("failed to locate custom-element definition"));
        });
      });
      el.src = this.elementURL(tag);
      document.head.appendChild(el);
      return res;
    }

    elementURL(tag) {
      return `${this.rootDir}/${tag}.js`;
    }
    get rootDir() {
      let uri = this.getAttribute("root-dir");
      if (!uri) {
        throw new Error("cannot auto-load custom elements: missing `root-dir`");
      }
      if (uri.endsWith("/")) {
        // remove trailing slash
        return uri.substring(0, uri.length - 1);
      }
      return uri;
    }
  }
);
