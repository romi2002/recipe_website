import axios from 'axios'

const serverUrl = 'http://localhost:3000/search/'

export default class Search {
  static typeahead (query, offset = 0, limit = 0) {
    return axios.get(serverUrl + 'typeahead', { params: { query, offset, limit } })
  }
}
