import axios from 'axios'

const serverUrl = 'http://localhost:3000/recommend/'

export default class Recommended {
  static getRecommendedRecipes (recipeId) {
    return axios.get(serverUrl + recipeId, {})
  }
}
