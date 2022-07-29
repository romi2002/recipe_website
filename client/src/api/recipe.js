import axios from 'axios'
import { SERVER_URL } from '../utils/Constants'

const serverUrl = SERVER_URL + '/recipes/'

export default class Recipe {
  static loadRecipes (offset = 0, limit = 0, sort_method) {
    return axios.get(serverUrl, { params: { offset, limit, sort_method } })
  }

  static loadRecipe (id) {
    return axios.get(serverUrl + id)
  }

  static uploadImage (file, token) {
    const data = new FormData()
    data.append('token', token)
    data.append('file', file)
    return axios.post(serverUrl + 'image_upload', data, { params: { token } })
  }

  static saveRecipe (recipe, token) {
    return axios.post(serverUrl, { recipe, token })
  }

  static getRecipeCount () {
    return axios.get(serverUrl + 'count')
  }

  static async getPageCount (limit = 20) {
    const count = await this.getRecipeCount()
    return Math.ceil(count.data.length / limit)
  }

  static sendIngredientsMessage (id, token) {
    return axios.post(serverUrl + 'send_ingredients/' + id, { token })
  }

  static sendInstructionsMessage (id, token) {
    return axios.post(serverUrl + 'send_instructions/' + id, { token })
  }

  static getUserRecipes (token) {
    return axios.get(serverUrl + 'user_recipes', { params: { token } })
  }
}
