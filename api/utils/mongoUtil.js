const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = 'mongodb://admin:admin@localhost:27017'
const _db = new MongoClient(uri, { serverApi: ServerApiVersion.v1 })

module.exports = {
  connectToServer: () => {
    // TODO Handle errors when connecting to server
    _db.connect()
  },

  getDb: () => {
    return _db
  }
}
