const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sanjana:sanjana123@cluster0.j5x75l5.mongodb.net/adminPanel-passport')

const db = mongoose.connection;

db.once('open',(err)=>{
  err ? console.log(err) : console.log("DB is connected....")
})

module.exports = db
