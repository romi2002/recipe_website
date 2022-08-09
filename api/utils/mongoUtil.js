const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = 'mongodb://admin:admin@127.0.0.1:27017/?directConnection=true'
const _db = new MongoClient(uri, { serverApi: ServerApiVersion.v1, serverSelectionTimeoutMS: 500 })

module.exports = {
  connectToServer: () => {
    // TODO Handle errors when connecting to server
    _db.connect(err => {
      console.log(err)
    })
  },

  getDb: () => {
    return _db
  }
}
