import LemonClientApi from "../ClientApi.mjs";

export default class DataController {
    constructor(modelName){
        this.modelName = modelName.toLowerCase();
    }

   async getData() {
    try{
        const data = await LemonClientApi.getGame(this.modelName);
        const sorted = data.sort((a, b) => a.score - b.score);
        return sorted;
    }
    catch(error){
        console.error(error);
    }
  }

   setData(data) {
    try{
        return LemonClientApi.add(this.modelName, data);
    }
    catch(error){
        console.error(error);
    }
  }
}
