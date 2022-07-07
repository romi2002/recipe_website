const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb")

const uri = "mongodb://admin:admin@localhost:27017"
const client = new MongoClient(uri, {serverApi: ServerApiVersion.v1})

client.connect()
const database = client.db("recipe_app")
const users = database.collection("users")


/* GET users listing. */
router.post('/createUser',
    body("email").isEmail(),
    body("password").isLength({min: 5}),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()})
        }

        //TODO check if a user does not already exist with the same email
        await users.insertOne({
            'username': req.body.email,
            'password': req.body.password
        })

        res.status(200).send({data: "user-created"})
    })

router.post('/login',
    body("email").isEmail(),
    body("password").isLength({min: 5}),
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({errors: errors.array()})
        }

        const user = await users.findOne({'username' : req.body.email,
                                 'password' : req.body.password})

        if(!user) {
            return res.status(400).send({errors: "Invalid username/password"})
        }

        //TODO return token?
        res.status(200).send({data: "user-login"})
    })

module.exports = router
