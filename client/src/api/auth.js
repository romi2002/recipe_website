import axios from 'axios'

const serverUrl = 'http://localhost:3000'

export default class Auth {
  static createUser (email, password, userInfo) {
    return axios.post(serverUrl + '/users/create_user', {
      email, password, userInfo
    })
  }

  static login (email, password) {
    return axios.post(serverUrl + '/users/login', {
      email, password
    }).then(res => {
      return res.data.token
    })
  }

  static logout () {
    // Not the most secure solution... but works
    // Overwrites the userData token in storage with an invalid token
    localStorage.setItem('user_data', JSON.stringify({
      username: null, isLoggedIn: false, token: null
    }))
  }

  static validateToken (token) {
    return axios.get(serverUrl + '/users/is_valid_token', {
      params: { token }
    })
  }
}
