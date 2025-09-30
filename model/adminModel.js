const mongoose = require('mongoose')

const uploads = '/uploads'
const path = require('path')
const multer = require('multer')

const adminSchema = mongoose.Schema({
  name :{
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  message : {
    type : String,
    required : true
  },
  city : {
    type : String,
    required : true
  },
  gender : {
    type : String,
    required : true
  },
  qualification : {
    type : Array,
    required : true
  },
  profile :{
    type : String,
    required : true
  },
  status : {
    type : Boolean,
    required : true
  },
  start_date : {
    type : String,
    required : true
  },
  update_date : {
    type : String,
    required : true
  }
})

const storage = multer.diskStorage({
  destination : (req,file,cb) =>{
    cb(null,path.join(__dirname,'..',uploads))
  },
  filename : (req,file,cb) => {
    cb(null,file.fieldname+'-'+Date.now())
  }
})

adminSchema.statics.imageUpload = multer({storage : storage}).single('profile')


const admin = mongoose.model('admin',adminSchema)

module.exports = admin;