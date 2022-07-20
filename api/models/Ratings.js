const mongoUtil = require('../utils/mongoUtil')

const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const ratings = database.collection('ratings')

class Ratings {
  static async addRating (userData, recipeId, rating) {
    // TODO validate parameters
    await ratings.insertOne({
      userData, // TODO write only user id
      recipeId,
      rating
    })
  }
}

export default Ratings
