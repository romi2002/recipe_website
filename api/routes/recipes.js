const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const auth = require('../models/Authentication')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { sendTextMessage } = require('../utils/twilioUtil')
const { getRecipe } = require('../models/Recipes')
const mongoUtil = require('../utils/mongoUtil')
const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const recipes = database.collection('recipes')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/user_images'),
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname))
})
const upload = multer({ storage }).single('file')

const sortMethods = {
  'date-ascending': { timestamp: 1 },
  'date-descending': { timestamp: -1 },
  'rating-ascending': { average_rating: 1 },
  'rating-descending': { average_rating: -1 },
  'alphabetical-ascending': { title: 1 }, // TODO handle alphabetical order correctly, should ignore upper case
  'alphabetical-descending': { title: -1 }
}

router.get('/', (req, res) => {
  const offset = parseInt(req.query.offset ?? '0')
  const limit = parseInt(req.query.limit ?? '10')
  const sortMethod = req.query.sort_method ?? 'date-descending'

  recipes.find({}).sort(sortMethods[sortMethod]).skip(offset).limit(limit).toArray((err, data) => {
    if (err) throw err
    res.send({ data })
  })
})

router.get('/count', (req, res) => {
  recipes.estimatedDocumentCount().then((ret) => res.status(200).send({ length: ret }))
})

router.post('/image_upload', auth.decodeToken, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send({ errors: 'Upload error' })
      return
    }

    res.status(200).send(req.file)
  })
})

router.post('/', body('recipe.title').exists(), body('recipe.instructions').exists(), body('recipe.ingredients').exists(), body('recipe.token').exists(), auth.decodeToken, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  const recipe = { ...req.body.recipe }
  recipe.timestamp = Date.now()
  recipe.user_id = res.locals.userData.id

  delete recipe.token

  await recipes.insertOne(recipe)
  res.status(200).send({ data: 'success' })
})

router.post('/send_ingredients/:recipeId', auth.decodeToken, getRecipe, async (req, res) => {
  const ingredients = res.locals.recipe.ingredients.map((i) => i.text).join('\n')
  await sendTextMessage('',
    'To make: ' + res.locals.recipe.title + '\nYou need the following ingrdients\n' + ingredients)
  res.status(200).send({ status: 'Text message sent' })
})

router.post('/send_instructions/:recipeId', auth.decodeToken, getRecipe, async (req, res) => {
  const instructions = res.locals.recipe.instructions.map((i) => i.text).join('\n')
  await sendTextMessage('', 'Here\'s the instructions to make: ' + res.locals.recipe.title + '\n' + instructions)
  res.status(200).send({ status: 'Text message sent' })
})

/**
 * Gets all recipes posted by user given their token
 */
router.get('/user_recipes', auth.decodeToken, (req, res) => {
  recipes.find({ user_id: res.locals.userData.id }).toArray((err, data) => {
    if (err) {
      res.status(400).send({ error: err })
      return
    }

    res.status(200).send({ data })
  })
})

router.get('/:recipeId', getRecipe, async (req, res) => {
  res.status(200).send({ data: res.locals.recipe })
})

module.exports = router
