import axios from 'axios'
import { SERVER_URL } from '../utils/Constants'

const serverUrl = SERVER_URL + '/recommend/'

export default class Recommended {
  static getRecommendedRecipes (recipeId) {
    return axios.get(serverUrl + recipeId, {})
  }
}
