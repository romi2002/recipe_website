import axios from 'axios'
import { SERVER_URL } from '../utils/Constants'

const serverUrl = SERVER_URL + '/comments/'

export default class Comments {
  static postComment (data) {
    return axios.post(serverUrl, data)
  }

  static getComments (recipeId) {
    return axios.get(serverUrl + recipeId)
  }
}
