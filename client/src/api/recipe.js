import axios from "axios"

const serverUrl = "http://localhost:3000/"

export default class Recipe {
    static loadRecipes(offset=0, limit=0){
        return axios.get(serverUrl+"recipes/", {offset:offset, limit:limit})
    }
}

