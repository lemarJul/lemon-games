export default function (screen) {
  const duplicateContent = (target)=> {
    target.innerHTML = target.innerHTML + target.innerHTML;    
  }

  duplicateContent(screen.querySelector("#creditsContent"))
}

export  const path = import.meta.url

