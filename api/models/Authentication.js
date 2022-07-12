const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb")

const uri = "mongodb://admin:admin@localhost:27017"
const client = new MongoClient(uri, {serverApi: ServerApiVersion.v1})

client.connect()
const database = client.db("recipe_app")
const users = database.collection("users")

//TODO generate a good secret for prod :)
const token_secret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

class Authentication {
    static generateSalt() {
        return crypto.randomBytes(16).toString('hex')
    }

    static hashPassword(salt, password) {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    }

    /**
     * Creates a new user given desired username and password
     * @param username
     * @param password
     */
    static async createUser(username, password) {
        //TODO check if user already exists with the same email

        const salt = Authentication.generateSalt()
        const hash = Authentication.hashPassword(salt, password)

        await users.insertOne({
            'username': username,
            'hash': hash,
            'salt': salt
        })
    }

    /**
     * Attempts to login a user given username and password,
     * If login is successful, returns a token otherwise null
     * @param username
     * @param password
     */
    static async loginUser(username, password) {
        const user = await users.findOne({'username': username})

        //Is this the best way to handle responding with errors?
        if (user == null) {
            return {error: "Invalid username/password"}
        }

        const hash = Authentication.hashPassword(user.salt, password)
        if (hash !== user.hash) {
            return {errors: "Invalid username/password"}
        }

        console.log("valid")

        return {
            token:
                jwt.sign({username: username},
                    token_secret,
                    {expiresIn: '1h'})
        }
    }

    /**
     * Verifies the JWT, returns username if valid
     * @param token
     */
    static verifyToken(token) {
        try {
            return jwt.verify(token, token_secret)
        } catch (err) {
            throw new Error('Invalid token!')
        }
    }
}

module.exports = Authentication