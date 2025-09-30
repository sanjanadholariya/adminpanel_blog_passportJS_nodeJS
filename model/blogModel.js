const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const uploads = '/uploads'

const blogSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description :{
    type : String,
    required : true
  },
  image : {
    type : String ,
    required : true
  },
  date : {
    type : String ,
    required : true
  },
  editDate : {
    type : String,
    required : true
  },
  category : {
    type : String ,
    required : true
  }
})

const storage = multer.diskStorage({
  destination : (req , file , cb) => {
    cb(null , path.join(__dirname , ".." , uploads))
  },
  filename : (req, file , cb) => {
    cb(null , file.fieldname+'-'+Date.now())
  }
})

blogSchema.statics.imageUpload = multer({storage : storage}).single('image')

const blog = mongoose.model('blog',blogSchema)

module.exports = blog;