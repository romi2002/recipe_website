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

    static async saveRecipe(recipe){
        //Preprocess recipe img to base64
        recipe.files = await Promise.all(recipe.files.map(async file => await toBase64(file)))

        return axios.post(serverUrl+"recipes/", recipe)
    }
}

