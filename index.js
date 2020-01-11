const express = require('express')
const authRoutes= require('./routes/auth-routes')

const ejs = require('ejs')

const app = express()
// set up view engine
app.set('view engine','ejs')

//set up routes
app.use('/auth',authRoutes)

//create home route
app.get('/',(req,res)=>{
    res.render('home')
})
//set up listener
app.listen(3000,()=>{
    console.log('listening to port 3000 for requests');
    
})

// update to install passport-google-oauth20