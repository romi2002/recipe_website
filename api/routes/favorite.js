const express = require('express')
const auth = require('../models/Authentication')
const { body, validationResult } = require('express-validator')
const mongoUtil = require('../utils/mongoUtil')
const { getRecipe } = require('../models/Recipes')
const { ObjectId } = require('mongodb')
const router = express.Router()

const client = mongoUtil.getDb()
const recipeDoc = client.db('recipe_app').collection('recipes')
const favorites = client.db('recipe_app').collection('favorites')

router.post('/:recipeId', auth.decodeToken, getRecipe, body('isFavorite').isBoolean(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  const userId = res.locals.userData.id
  const recipeId = req.params.recipeId

  await favorites.deleteMany({
    userId, recipeId
  })

  // Only add element if is favorite, otherwise only delete elements which match favorite
  if (req.body.isFavorite) {
    await favorites.insertOne({
      userId, recipeId
    })
  }

  res.status(200).send({ ret: 'done' })
})

/**
 * Returns all recipe ids which user has favorited
 */
router.get('/user_favorites', auth.decodeToken, (req, res) => {
  favorites.find({ userId: res.locals.userData.id }).toArray().then((doc, err) => {
    const recipeIds = doc.map(d => d.recipeId)
    res.status(200).send({ recipeIds })
  })
})

/**
 * Returns all recipes that the user has favorited
 */
router.get('/favorite_recipes', auth.decodeToken, async (req, res) => {
  const favoriteIds = (await favorites.find({ userId: res.locals.userData.id }).toArray()).map(d => new ObjectId(d.recipeId))
  const recipes = await recipeDoc.find({ _id: { $in: favoriteIds } }).toArray()
  res.status(200).send({ recipes })
})

module.exports = router
