const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const authentication = require('../models/Authentication')

/* GET users listing. */
router.post('/create_user',
  body('email').exists(),
  body('password').isLength({ min: 5 }),
  body('userInfo').exists(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    await authentication.createUser(req.body.email, req.body.password, req.body.userInfo)

    res.status(200).send({ data: 'user-created' })
  })

router.post('/login',
  body('email').exists(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    res.status(200).send(await authentication.loginUser(req.body.email, req.body.password))
  })

/*
Simple route in which checks if the token is valid
 */
router.get('/is_valid_token', (req, res) => {
  res.status(200).send({ validToken: authentication.isValidToken(req.query.token ?? '') })
})

module.exports = router
