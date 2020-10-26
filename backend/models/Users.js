// https://youtu.be/tNk2FSKlSYU
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// setting up a schema for our model
const user = new Schema({
    username : String,
    googleID : String,
    thumbnail: String,
    pendingTodos: [String],
    completedTodos:[String],
})
// creating a user model class using .model(name,schema)
const User = mongoose.model('user',user) //name, schema
module.exports = User // this is a class
