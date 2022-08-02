const mongoUtil = require('../utils/mongoUtil')
mongoUtil.connectToServer()
const { processRecipeIngredients } = require('../models/Recipes')
const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const recipes = database.collection('recipes').find()

recipes.forEach(recipe => {
  processRecipeIngredients(recipe.ingredients.map((i) => i.text)).then(keywords => {
    const newValues = { $set: { ingredient_keywords: keywords } }
    database.collection('recipes').updateOne({ _id: recipe._id }, newValues)
  })
})
