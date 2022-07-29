const mongoUtil = require('../utils/mongoUtil')
const { ObjectId } = require('mongodb')
const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const recipes = database.collection('recipes')

const ingredientDb = database.collection('ingredients').find({}).toArray()

module.exports = {
  /**
   * Process ingredients and associate ids
   * @param recipeIngredients
   * @returns {Promise<void>}
   */
  processRecipeIngredients: async (recipeIngredients) => {
    /**
     * For each ingredient string, compare to all ingredients in db
     * keyword will be the ingredient with the largest length
     */
    return Promise.all(recipeIngredients.map(async (ingredient) => (
      (await ingredientDb)
        .filter(i => ingredient.toLowerCase().includes(i.text))
        .sort((a, b) => b.text.length - a.text.length)?.[0]
    )))
  },

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

    doc.ingredient_keywords = await module.exports.processRecipeIngredients(doc.ingredients.map(i => i.text))

    res.locals.recipe = doc
    next()
  }
}
