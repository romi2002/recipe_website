const express = require('express')
const router = express.Router()
const { query, validationResult } = require('express-validator')
const mongoUtil = require('../utils/mongoUtil')
const { getAvailableIngredients, processRecipeIngredients } = require('../models/Recipes')

const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const recipes = database.collection('recipes')

/**
 * Basic text search functionality
 * Searches query inside recipe titles, returns error if no results are found
 */
router.get('/', query('query').exists(), query('offset').isNumeric().optional(), query('limit').isNumeric().optional(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  const limit = req.query.limit ?? 10
  const offset = req.query.offset ?? 0

  const data = await recipes.find({
    $text: { $search: req.query.query }
  }).skip(parseInt(offset)).limit(parseInt(limit)).toArray()

  if (data == null) {
    return res.status(404).send('No results found!')
  }

  res.status(200).send({ data })
})

/**
 * Searches for titles beginning with query
 */
router.get('/typeahead', query('query').exists(), query('offset').isNumeric().optional(), query('limit').isNumeric().optional(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  // TODO Sanitize / string escape query
  const query = req.query.query
  const limit = req.query.limit ?? 10
  const offset = req.query.offset ?? 0

  const data = await recipes.find({
    title: { $regex: `^${query}.*`, $options: 'i' }
  }).skip(parseInt(offset)).limit(parseInt(limit)).toArray()

  if (data == null) {
    return res.status(404).send('No results found!')
  }

  res.status(200).send({ data })
})

const ingredientSearchAgr = (ingredients) => [{
  $match: {
    ingredient_keywords: { $exists: true }
  }
}, {
  $set: {
    matching_ingredients: {
      $size: {
        $ifNull: [{
          $setIntersection: ['$ingredient_keywords.text', ingredients]
        }, ['0']]
      }
    }
  }
},
{
  $sort: {
    matching_ingredients: -1
  }
}]

router.get('/available_ingredients', async (req, res) => {
  res.status(200).send({ ingredients: await getAvailableIngredients() })
})

/**
 * Searches for recipes containing the following keywords
 */
router.get('/ingredient_search_keywords', query('offset').isNumeric(), query('limit').isNumeric(), query('keywords').isArray(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  const limit = parseInt(req.query.limit)
  const offset = parseInt(req.query.offset)
  const keywords = req.query.keywords.map((ingr) => {
    return JSON.parse(ingr).text
  })

  const agr = ingredientSearchAgr(keywords)

  const data = await recipes.aggregate(agr).limit(limit).skip(offset).toArray()
  res.status(200).send(data)
})

router.get('/ingredient_search', query('offset').isNumeric(), query('limit').isNumeric(), query('ingredients').isArray(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ erros: errors.array() })
  }

  const limit = parseInt(req.query.limit)
  const offset = parseInt(req.query.offset)
  const ingredients = req.query.ingredients

  const keywords = await processRecipeIngredients(ingredients)
  console.log(keywords)
  const agr = ingredientSearchAgr(keywords.map(k => k.text))

  const data = await recipes.aggregate(agr).limit(limit).skip(offset).toArray()
  res.status(200).send(data)
})

module.exports = router
