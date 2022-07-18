import axios from "axios"

const serverUrl = "http://localhost:3000/recipes/"

export default class Recipe {
    static loadRecipes(offset=0, limit=0){
        return axios.get(serverUrl, { params: {offset:offset, limit:limit}})
    }

    static loadRecipe(id){
        return axios.get(serverUrl+id)
    }

    static uploadImage(file, token) {
        const data = new FormData()
        data.append('file', file)
        data.append('token', token)
        return axios.post(serverUrl + "image_upload", data)
    }

    static saveRecipe(recipe){
        return axios.post(serverUrl, recipe)
    }

    static getRecipeCount(){
        return axios.get(serverUrl+"count")
    }

    static async getPageCount(limit=20){
        const count = await this.getRecipeCount()
        return Math.ceil(count.data.length / limit)
    }

    static sendIngredientsMessage(id, token) {
        return axios.post(serverUrl + "send_instructions/" + id, {token: token})
    }
}

