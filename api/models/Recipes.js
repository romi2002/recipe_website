const mongoUtil = require('../utils/mongoUtil')
const { ObjectId } = require('mongodb')
const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const recipes = database.collection('recipes')

module.exports = {
  /**
   * Express middleware, gets recipe from :recipeId param and places it in res.locals
   * @param req
   * @param res
   * @param next
   */
  getRecipe: async (req, res, next) => {
    const objectId = new ObjectId(req.params.recipeId)
    const doc = await recipes.findOne({ _id: objectId })
    if (doc == null) {
      res.status(400).send({ errors: 'Invalid recipe id!' })
      return
    }

    res.locals.recipe = doc
    next()
  }
}
