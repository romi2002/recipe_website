const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const mongoUtil = require('../utils/mongoUtil')

const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const recipes = database.collection('recipes')

/**
 * Basic text search functionality
 * Searches query inside recipe titles, returns error if no results are found
 */
router.get('/',
  body('query').exists(),
  body('offset').isNumeric().optional(),
  body('limit').isNumeric().optional(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    const limit = req.body.limit ?? 10
    const offset = req.body.offset ?? 0

    const data = await recipes.find({
      $text:
                { $search: req.body.query }
    }).skip(parseInt(offset)).limit(parseInt(limit)).toArray()

    if (data == null) {
      return res.status(404).send('No results found!')
    }

    res.status(200).send({ data })
  })

/**
 * Searches for titles beginning with query
 */
router.get('/typeahead',
  body('query').exists(),
  body('offset').isNumeric().optional(),
  body('limit').isNumeric().optional(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    // TODO Sanitize / string escape query
    const query = req.body.query
    const limit = req.body.limit ?? 10
    const offset = req.body.offset ?? 0

    const data = await recipes.find({
      title: { $regex: `^${query}.*`, $options: 'i' }
    }).skip(parseInt(offset)).limit(parseInt(limit)).toArray()

    if (data == null) {
      return res.status(404).send('No results found!')
    }

    res.status(200).send({ data })
  })
module.exports = router
