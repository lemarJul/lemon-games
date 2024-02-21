export default function () {
  duplicateContent(document.getElementById("creditsContent"))
}

function duplicateContent(target) {
    console.log("duplicating content");
    console.log("target", target);
    target.innerHTML = target.innerHTML + target.innerHTML;
}
