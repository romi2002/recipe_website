const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const auth = require('../models/Authentication')
const ratings = require('../models/Ratings')

router.post('/:recipeId', auth.decodeToken, body('rating').exists(), (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  ratings.addRating(res.locals.userData.id, req.params.recipeId, req.body.rating).then(() => // TODO check for mongo errors
    res.status(200).send({}))
})

router.get('/user_rating/:recipeId', auth.decodeToken, (req, res) => {
  ratings.getRatingForUser(res.locals.userData.id, req.params.recipeId).then((doc) => {
    if (doc == null) {
      res.status(400).send({ error: 'No rating found' })
    } else {
      const rating = doc.rating
      res.status(200).send({ rating })
    }
  })
})

module.exports = router
