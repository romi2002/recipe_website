import axios from 'axios'

const serverUrl = 'http://localhost:3000/ratings/'

export default class Ratings {
  static rateRecipe (recipeId, rating, token) {
    return axios.post(serverUrl + recipeId, { rating, token })
  }
}
