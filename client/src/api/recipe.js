import axios from "axios"

const serverUrl = "http://localhost:3000/"

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default class Recipe {
    static loadRecipes(offset=0, limit=0){
        return axios.get(serverUrl+"recipes/", {offset:offset, limit:limit})
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
}

