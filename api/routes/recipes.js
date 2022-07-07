var express = require('express')
var router = express.Router()
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb")

const uri = "mongodb://admin:admin@localhost:27017"
const client = new MongoClient(uri, {serverApi: ServerApiVersion.v1})

client.connect()
const database = client.db("recipe_app")
const recipes = database.collection("recipes")

router.get('/', async (req, res) => {
    const offset = parseInt(req.query.offset ?? "0")
    const limit = parseInt(req.query.limit ?? "10")

    const titleQuery = req.query.title ?? "**"

    //TODO fix query support
    const query = {
        'title':titleQuery
    }

    await recipes.find({}).skip(offset).limit(limit).toArray((err, data) => {
        if (err) throw err
        res.send({'data': data})
    })
})

router.get('/:recipeId', async (req, res) => {
    console.log(req.params.recipeId)
    const objectId = new ObjectId(req.params.recipeId)
    const doc = await recipes.findOne({'_id':objectId})
    res.send({'data':doc})
})

module.exports = router