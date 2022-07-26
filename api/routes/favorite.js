const express = require('express')
const auth = require('../models/Authentication')
const { body, validationResult } = require('express-validator')
const mongoUtil = require('../utils/mongoUtil')
const { getRecipe } = require('../models/Recipes')
const router = express.Router()

const client = mongoUtil.getDb()
const favorites = client.db('recipe_app').collection('favorites')

router.post('/:recipeId', auth.decodeToken, getRecipe, body('isFavorite').isBoolean(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  const userId = res.locals.userData.id
  const recipeId = req.params.recipeId

  await favorites.deleteMany({
    userId,
    recipeId
  })

  // Only add element if is favorite, otherwise only delete elements which match favorite
  if (req.body.isFavorite) {
    await favorites.insertOne({
      userId,
      recipeId
    })
  }

  res.status(200).send({ ret: 'done' })
})

/**
 * Returns all recipe ids which user has favorited
 */
router.get('/user_favorites', auth.decodeToken, async (req, res) => {
  favorites.find({ userId: res.locals.userData.id }).toArray().then((doc, err) => {
    const recipeIds = doc.map(d => d.recipeId)
    res.status(200).send({ recipeIds })
  })
})

module.exports = router
