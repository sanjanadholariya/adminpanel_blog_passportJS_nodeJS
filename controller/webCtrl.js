const blogModel = require('../model/blogModel')

module.exports.viewWebBlog = async(req , res) => {
    try{
        var search = "";
    var filter = "";
    if (req.query.search) {
      search = req.query.search
    }
    if(req.query.filter){
      filter = req.query.filter
    }
    let allBlog = await blogModel.find({
      $or: [
        {
          title: { $regex: search, $options: 'i' }
        },
        {
          description: { $regex: search, $options: 'i' }
        },
      ]
    })

    if(filter){
       allBlog = await blogModel.find({
        $or : [
          {
            category : {$regex : filter , $options : 'i'}
          }
        ]
      })
    }

    if(req.query.reset){
        allBlog = await blogModel.find();
    }
        
        return res.render('website/viewWebBlog',{allBlog})
    }catch(err){
        console.log(err);
        return res.redirect('/admin')
        
    }
}

module.exports.viewSingleWebBlogPage = async(req , res )=> {
    try{
        // console.log("viewsingleBlogPage");
        const single = await blogModel.findById(req.params.id)
        // console.log(single);

        return res.render('website/viewSingleWebBlogPage',{
            single
        })
        

        
    }catch(err){
        console.log(err);
        return res.redirect('/admin')
        
    }
}