const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb")

const uri = "mongodb://admin:admin@localhost:27017"
const client = new MongoClient(uri, {serverApi: ServerApiVersion.v1})

const crypto = require('crypto')

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

        //Generate salt and hash password
        const salt = crypto.randomBytes(16).toString('hex')
        const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex')

        //TODO check if a user does not already exist with the same email
        await users.insertOne({
            'username': req.body.email,
            'hash': hash,
            'salt': salt
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

        const user = await users.findOne({'username' : req.body.email})

        if(user == null) {
            return res.status(400).send({errors: "Invalid username/password"})
        }

        const hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex')
        if(hash !== user.hash){
            return res.status(400).send({errors: "Invalid username/password"})
        }

        req.session.loggedIn = true
        req.session.username = req.body.username

        res.status(200).send({data: "user-login"})
    })

/*
Simple route in which checks if the user is logged in
 */
router.get('/isLoggedIn', (req, res) => {
    res.status(200).send({loggedIn: req.session.loggedIn ?? false})
})

/*
When called, route logs out the user if it is currently logged in
 */
router.post('/logout', (req, res) => {
    //TODO Is it necessary to throw an error when logout is called and the user is not logged in?
    req.session.loggedIn = false

    res.status(200).send() //TODO Send something back?
})

module.exports = router
