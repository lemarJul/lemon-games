export const path = import.meta.url;

export const createConnectedCallback = (manager) => {
  return function () {
    const creditsContent = this.querySelector("#creditsContent"); 
    creditsContent.innerHTML += creditsContent.innerHTML; 

  };
};




