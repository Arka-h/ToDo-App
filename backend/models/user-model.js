// https://youtu.be/tNk2FSKlSYU
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// setting up a schema for our model
const userSchema = new Schema({
    username : String,
    googleID : String,
    thumbnail: String
})
// creating a user model class using .model(name,schema)
const User = mongoose.model('user',userSchema) //name, schema
module.exports = User // this is a class
/**
 * 
 * profile returns:
 * 
{ id: '111095948621725755031',
  displayName: 'Arka -h',
  name: { familyName: '-h', givenName: 'Arka' },
  photos:
   [ { value:
        'https://lh3.googleusercontent.com/a-/AAuE7mDDV13f0O5CzqK_TT0R0KzMVFaKRQUp0P-uank0uA' } ],
  provider: 'google',
  _raw:
   '{\n  "sub": "111095948621725755031",\n  "name": "Arka -h",\n  "given_name": "Arka",\n  "family_name": "-h",\n  "picture": "https://lh3.googleusercontent.com/a-/AAuE7mDDV13f0O5CzqK_TT0R0KzMVFaKRQUp0P-uank0uA",\n  "locale": "en"\n}',
  _json:
   { sub: '111095948621725755031',
     name: 'Arka -h',
     given_name: 'Arka',
     family_name: '-h',
     picture:
      'https://lh3.googleusercontent.com/a-/AAuE7mDDV13f0O5CzqK_TT0R0KzMVFaKRQUp0P-uank0uA',
     locale: 'en' } }
 */