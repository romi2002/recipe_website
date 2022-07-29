import axios from 'axios'

const serverUrl = 'http://localhost:3000/favorite/'

export default class Favorite {
  static favoriteRecipe (recipeId, isFavorite, token) {
    return axios.post(serverUrl + recipeId, { isFavorite, token })
  }

  static getFavoriteRecipeIds (token) {
    return axios.get(serverUrl + 'user_favorites', { params: { token } })
  }

  static getFavoriteRecipes (token) {
    return axios.get(serverUrl + 'favorite_recipes', { params: { token } })
  }
}
