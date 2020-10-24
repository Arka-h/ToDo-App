const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport') // use the same instance of passport throughout the entire server
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const mongoURL = require('./keys/dbKeys')
const authRoutes = require("./routes/auth-routes");
const fetchTodos = require("./routes/fetchTodos");
    //------------------------------------------------MONGOOSE & GRIDFS-----------------------------------------------------------
mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('Mongoose is connected!')
    })

//------------------------------------------------------MIDDLEWARE--------------------------------------------------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: "http://localhost:3000", // <-- location of the react app we're connecting
    credentials: true
}))

app.use(cookieParser('secretcode'))
app.use(session({
    secret:'secretcode',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    resave : true,
    saveUninitialized : true,
}))



app.use(passport.initialize())
app.use(passport.session())
require('./passport/googleFlow')(passport)

//----------------------------------------------------ROUTES-------------------------------------------------------------------


app.use("/auth", authRoutes);
app.use("/fetch", fetchTodos);


//-----------------------------------------------------SERVER LISTENING PORT-------------------------------------------------------------------

app.listen(4000, () => {
    console.log('Server has started..')
})

// ------------------------------------------------------PLAN-------------------------------------------------------------------
/**
 * '/{employer_username}' --> show all the jobs under him/her                |
 * '/{employer_username}/i' --> shows specific jobs ke applicants            | with [option to change his profile details](top)
 * '/{employer_username}/i/{applicant_name}'-->display the applicant resume  |
 * '/' -->[list of all jobs](main)                                            | common across candidate and homepage states [landing page]
 * '/{candidate_username}/applied' -->list of applied jobs                   |
 * '/{candidate_username}/selected_job' -->shows the details of the job      | with [option to change his profile details](top)
 * '/{candidate_username}/selected_job/apply' --> upload resume              |
 */