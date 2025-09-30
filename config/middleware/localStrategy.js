const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const adminModel = require('../../model/adminModel')
const bcrypt = require('bcrypt')

passport.use(new localStrategy({
    usernameField : 'email'
},async(email , password , cb) => {
    let adminRecord = await adminModel.findOne({email : email})
    if(adminRecord){
        let matchPassword = await bcrypt.compare(password , adminRecord.password)
        if(matchPassword){
            cb(null , adminRecord)
        }
        else{
            cb(null , false)
        }
    }else{
        cb(null , false)
    }
}
))

passport.serializeUser((user , cb) => {
    cb(null , user.id)
})

passport.deserializeUser(async(id , cb) => {
    let adminRecord = await adminModel.findById(id)
    if(adminRecord){
        cb(null , adminRecord )
    }
})

// check krne k lia k admin authenticated h ya nahi

passport.checkAdmin = async(req , res , next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        return res.redirect('/')
    }
}

// to create local user

passport.setAuthenticateUser = (req , res , next) => {
    if(req.user){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport