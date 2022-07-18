import axios from 'axios'

const serverUrl = 'http://localhost:3000'

export default class Auth {
  static createUser (email, password) {
    return axios.post(serverUrl + '/users/create_user', {
      email,
      password
    })
  }

  static login (email, password) {
    return axios.post(serverUrl + '/users/login', {
      email,
      password
    }).then(res => {
      return res.data.token
    })
  }

  static validateToken (token) {
    return axios.get(serverUrl + '/users/is_valid_token', {
      params:
                { token }
    })
  }
}
