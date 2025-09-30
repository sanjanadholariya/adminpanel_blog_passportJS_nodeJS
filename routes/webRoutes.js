const express = require('express')
const { viewWebBlog, viewSingleWebBlogPage } = require('../controller/webCtrl')

const routes = express.Router()

routes.get('/',viewWebBlog)
routes.get('/viewSingleWebBlogPage/:id',viewSingleWebBlogPage)

module.exports = routes