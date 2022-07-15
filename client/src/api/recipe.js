import axios from "axios"

const serverUrl = "http://localhost:3000/"

export default class Recipe {
    static loadRecipes(offset=0, limit=0){
        return axios.get(serverUrl+"recipes/", { params: {offset:offset, limit:limit}})
    }

    static loadRecipe(id){
        return axios.get(serverUrl+"recipes/"+id)
    }

    static uploadImage(file, token) {
        const data = new FormData()
        data.append('file', file)
        data.append('token', token)
        return axios.post(serverUrl + "recipes/image_upload", data)
    }

    static saveRecipe(recipe){
        return axios.post(serverUrl+"recipes/", recipe)
    }

    static getRecipeCount(){
        return axios.get(serverUrl+"recipes/count")
    }

    static async getPageCount(limit=20){
        const count = await this.getRecipeCount()
        return Math.ceil(count.data.length / limit)
    }
}

