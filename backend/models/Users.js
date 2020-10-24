// https://youtu.be/tNk2FSKlSYU
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// setting up a schema for our model
const userSchema = new Schema({
    username : String,
    googleID : String,
    thumbnail: String,
    Todos: [{
        finished: Boolean,
        content: String
    }]
})
// creating a user model class using .model(name,schema)
const User = mongoose.model('user',userSchema) //name, schema
module.exports = User // this is a class
