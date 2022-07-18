const express = require('express')
const {body, validationResult} = require('express-validator')
const router = express.Router()
const mongoUtil = require('../utils/mongoUtil')
const auth = require('../models/Authentication')
const multer = require('multer')
const path = require('path')
const {v4: uuidv4} = require('uuid')
const {ObjectId} = require("mongodb")

const twilioUtil = require('../utils/twilioUtil')
const {sendTextMessage} = require("../utils/twilioUtil")

const client = mongoUtil.getDb()
const database = client.db("recipe_app")
const recipes = database.collection("recipes")

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/user_images'),
    filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname))
})
const upload = multer({storage: storage}).single('file')

router.get('/', (req, res) => {
    const offset = parseInt(req.query.offset ?? "0")
    const limit = parseInt(req.query.limit ?? "10")

    recipes.find({}).sort({'timestamp': -1}).skip(offset).limit(limit).toArray((err, data) => {
        if (err) throw err
        res.send({'data': data})
    })
})

router.get('/count', (req,res) => {
    recipes.estimatedDocumentCount().then((ret) => res.status(200).send({length: ret}))
})

router.post('/image_upload', (req, res) => {
    upload(req, res, (err) => {
        if (!auth.verifyToken(req.body.token ?? '')) {
            res.status(401).send({errors: "Unauthenticated"})
            return
        }

        if (err) {
            res.status(500).send({errors: "Upload error"})
            return
        }

        res.status(200).send(req.file)
    })
})


router.post('/',
    body("title").exists(),
    body("instructions").exists(),
    body("ingredients").exists(),
    body("token").exists(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()})
        }

        if (!auth.verifyToken(req.body.token)) {
            return res.status(401).send({errors: 'Unauthorized'})
        }

        const recipe = {...req.body}
        recipe.timestamp = Date.now()
        recipe.comments = []

        delete recipe.token

        await recipes.insertOne(recipe)
        res.status(200).send({data:'success'})
    })

router.post("/send_instructions/:recipeId", body("token").exists(), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }

    if (!auth.verifyToken(req.body.token)) {
        return res.status(401).send({errors: 'Unauthorized'})
    }

    const objectId = new ObjectId(req.params.recipeId)
    const doc = await recipes.findOne({'_id': objectId})
    if (doc == null){
        return res.status(400).send({errors: 'Recipe not found!'})
    }

    const ingredients = doc.ingredients.map((i) => i.text).join('\n')
    await sendTextMessage("", "You need the following ingrdients\n" + ingredients)
})

router.get('/:recipeId', async (req, res) => {
    //TODO throw error when recipe is not found?
    const objectId = new ObjectId(req.params.recipeId)
    const doc = await recipes.findOne({'_id': objectId})
    res.send({'data': doc})
})

module.exports = router