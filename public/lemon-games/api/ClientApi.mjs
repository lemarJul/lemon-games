export default class LemonClientApi {
  static apiURL =
    "https://script.google.com/macros/s/AKfycbyTm6LjZR4X1YuJqDTa__2QgaTgRYUTrwi4LYQ1W68FOdrqs4_57TmV1C_Mn3-c9HqKUw/exec"

  static add(modelName, data) {
    if (!navigator.onLine) {
      console.warn('No Network Connection')
      return []
    }
    
    data.game = modelName;

    return fetch(this.apiURL, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static getAll() {
    if (!navigator.onLine) {
      console.warn('No Network Connection')
      return []
    }
    return fetch(this.apiURL)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static getGame(game) {
    if (!navigator.onLine) {
      console.warn('No Network Connection')
      return []
    }

    return fetch(`${this.apiURL}?route=${game}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.length) {
          console.error(`Couldn't fetch data corresponding to ${game}`, data);
        }
        return data;
      });
  }

}
