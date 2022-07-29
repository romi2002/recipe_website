const express = require('express')
const router = express.Router()
const { getRecipe } = require('../models/Recipes')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'http://localhost:9200'
})

router.get('/:recipeId', getRecipe, async (req, res) => {
  const results = await client.search({
    index: 'recipe_app.recipes',
    body: {
      query: {
        query_string: {
          query: res.locals.recipe.title,
          auto_generate_synonyms_phrase_query: true
        }
      }

    }
  })
  res.status(200).send({ results })
})

module.exports = router
