import axios from 'axios'
import { SERVER_URL } from '../utils/Constants'
import ReactGA from 'react-ga'

const serverUrl = SERVER_URL + '/comments/'

export default class Comments {
  static postComment (data) {
    ReactGA.event({
      category: 'User',
      action: 'Posted comment'
    })
    return axios.post(serverUrl, data)
  }

  static getComments (recipeId) {
    return axios.get(serverUrl + recipeId)
  }
}
