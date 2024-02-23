const SCREEN = document.querySelector("#win");

export default function () {
  const input = document.querySelector("#name-submit");
  input.classList.add("empty");
  input.addEventListener("input", function () {
    if (this.value.length > 0) {
      this.classList.remove("empty");
    } else {
      this.classList.add("empty");
    }
  });
}
