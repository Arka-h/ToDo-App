const { dbName, dbPassword } = require('./env')
module.exports = `mongodb+srv://admin:${dbPassword}@cluster0.zmjdd.mongodb.net/${dbName}?retryWrites=true&w=majority`
