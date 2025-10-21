const BlogPost = require('../models/BlogPost');

module.exports = async (req,res)=>{
    const search = req.query.search;
    let blogposts = {};
    if(search){
    blogposts = await BlogPost.find({title: {$regex: search, $options: 'i'}})
}else{
    blogposts = await BlogPost.find().populate('userid');
}
    res.render('index',{ blogposts })
};