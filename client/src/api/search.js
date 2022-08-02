import axios from 'axios'
import { SERVER_URL } from '../utils/Constants'
import ReactGA from 'react-ga'

const serverUrl = SERVER_URL + '/search/'

export default class Search {
  static textSearch (query, offset = 0, limit = 20) {
    ReactGA.event({
      category: 'Search',
      action: 'Ran text search'
    })

    return axios.get(serverUrl, { params: { query, offset, limit } })
  }

  static typeahead (query, offset = 0, limit = 20) {
    return axios.get(serverUrl + 'typeahead', { params: { query, offset, limit } })
  }

  static getAvailableIngredients () {
    return axios.get(serverUrl + 'available_ingredients')
  }

  static ingredientSearchKeywords (keywords, offset = 0, limit = 20) {
    ReactGA.event({
      category: 'Auth',
      action: 'Ran ingredient keyword search'
    })

    return axios.get(serverUrl + 'ingredient_search_keywords', { params: { keywords, offset, limit } })
  }

  static ingredientSearch (ingredients, offset = 0, limit = 20) {
    return axios.get(serverUrl + 'ingredient_search', { params: { ingredients, offset, limit } })
  }
}
