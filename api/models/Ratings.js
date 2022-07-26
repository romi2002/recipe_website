const mongoUtil = require('../utils/mongoUtil')
const { ObjectId } = require('mongodb')

const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const recipes = database.collection('recipes')
const ratings = database.collection('ratings')

class Ratings {
  static async addRating (userId, recipeId, rating) {
    await ratings.deleteMany({
      userId,
      recipeId
    })

    // TODO validate parameters
    await ratings.insertOne({
      userId, // TODO write only user id
      recipeId,
      rating
    })

    // run aggregation on affected recipe
    await recipes.aggregate([{
      $match: {
        _id: new ObjectId(recipeId)
      }
    }, {
      $addFields: {
        recipeId: {
          $toString: '$_id'
        }
      }
    }, {
      $lookup: {
        from: 'ratings', localField: 'recipeId', foreignField: 'recipeId', as: 'ratings'
      }
    }, {
      $set: {
        average_rating: {
          $avg: '$ratings.rating'
        }
      }
    }, {
      $unset: ['ratings', 'recipeId']
    }, {
      $merge: {
        into: 'recipes'
      }
    }]).toArray()
  }

  static getRatingForUser (userId, recipeId) {
    return ratings.findOne({
      userId,
      recipeId
    })
  }
}

module.exports = Ratings
