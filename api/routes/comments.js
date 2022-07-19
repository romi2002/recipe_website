const express = require('express')
const mongoUtil = require('../utils/mongoUtil')
const { body, validationResult } = require('express-validator')
const auth = require('../models/Authentication')
const { ObjectID, ObjectId } = require('mongodb')

const router = express.Router()

const client = mongoUtil.getDb()
const database = client.db('recipe_app')
const recipes = database.collection('recipes')
const comments = database.collection('comments')

const checkRecipeId = async (recipeId) => {
  return (await recipes.findOne({ _id: recipeId })) != null
}

const checkParentId = async (parentId) => {
  return (await comments.findOne({ _id: parentId })) != null || (await checkRecipeId(parentId))
}

const checkIds = async (req, res, next) => {
  if (!checkRecipeId(req.body.recipe_id) && checkParentId(req.body.parent_id)) {
    return res.status(400).send({ errors: 'Bad IDs' })
  }

  next()
}

/*
POST route to post a comment to a recipe
recipe_id -> Base recipe id to post the comment to
parent_id -> Parent comment/recipe to show comment
comment_text -> actual comment test
token -> used to get username
 */
router.post('/',
  body('recipe_id').exists(),
  body('token').exists(),
  body('parent_id').exists(),
  body('comment_text').exists(),
  auth.decodeToken, checkIds, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    const comment = {
      poster_id: res.locals.userData.id,
      parent_id: req.body.parent_id,
      recipe_id: req.body.recipe_id,
      text: req.body.comment_text,
      timestamp: Date.now()
    }

    comments.insertOne(comment).then(() => res.status(200).send({ data: 'successful' }))
  })

router.get('/:recipe_id',  (req, res) => {
  console.log(req.params.recipe_id)
  comments.find({'recipe_id': req.params.recipe_id}).toArray((err, comments) => {
    if (err) throw err
    res.status(200).send({comments})
  })
})

module.exports = router
