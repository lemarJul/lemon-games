var redirectionAttribute = "show-screen";

export default function () {
  document
    .querySelector("#display")
    .addEventListener("click", redirectTo.bind(this));
}

function redirectTo({ target }) {
  const redirection = target.getAttribute(redirectionAttribute);
  if (redirection) {
    console.log("redirecting to", redirection);
    console.log("this.screenController.display", this.screenController.display);
    this.screenController.display[redirection]();
  }
}
