const express = require('express')

const app = express()

const port = 8001;

const path = require('path')

const db = require('./config/db')

const passport = require('passport')

const localStrategy = require('./config/middleware/localStrategy')

const flashmsg = require('./config/middleware/flashmsg')

app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded())

const flash = require('connect-flash')
app.use(flash())

const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "assets")));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// create session

app.use(session({
  name : "testing",
  secret : "admin-panel",
  resave : true,
  saveUninitialized : false,
  cookie : {
    maxAge : 1000 * 60 * 60
  }
}))

app.use(passport.session()) // connect session passport

app.use(passport.initialize())  // to turn on passport 

app.use(passport.setAuthenticateUser)

app.use(flashmsg.flashMsg)

app.use('/',require('./routes'))



app.listen(port , (err)=>{
  err ? console.log(err) : console.log(`server is running on port ${port}`);
  
})