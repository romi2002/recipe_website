import axios from 'axios'
import { SERVER_URL } from '../utils/Constants'

const serverUrl = SERVER_URL + '/ratings/'

export default class Ratings {
  static rateRecipe (recipeId, rating, token) {
    return axios.post(serverUrl + recipeId, { rating, token })
  }

  static getRatingForUser (recipeId, token) {
    return axios.get(serverUrl + 'user_rating/' + recipeId, { params: { token } })
  }
}
