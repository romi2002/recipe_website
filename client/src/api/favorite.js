import axios from 'axios'
import ReactGA from 'react-ga'

const serverUrl = 'http://localhost:3000/favorite/'

export default class Favorite {
  static favoriteRecipe (recipeId, isFavorite, token) {
    ReactGA.event({
      category: 'User',
      action: 'Added favorite recipe'
    })
    return axios.post(serverUrl + recipeId, { isFavorite, token })
  }

  static getFavoriteRecipeIds (token) {
    return axios.get(serverUrl + 'user_favorites', { params: { token } })
  }

  static getFavoriteRecipes (token) {
    return axios.get(serverUrl + 'favorite_recipes', { params: { token } })
  }
}
