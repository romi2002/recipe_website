import axios from 'axios'

const serverUrl = 'http://localhost:3000/search/'

export default class Search {
  static textSearch (query, offset = 0, limit = 20) {
    return axios.get(serverUrl, { params: { query, offset, limit } })
  }

  static typeahead (query, offset = 0, limit = 5) {
    return axios.get(serverUrl + 'typeahead', { params: { query, offset, limit } })
  }
}
