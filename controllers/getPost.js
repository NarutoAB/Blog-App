const BlogPost = require('../models/BlogPost');

module.exports = async (req,res)=>{
    try {
        const blogpost = await BlogPost.findById(req.params.id).populate('userid');
        if (!blogpost) {
            return res.status(404).render('post', { blogpost: null, error: 'Post not found' });
        }
        res.render('post',{ blogpost });
    } catch (err) {
        console.log(err);
        res.status(500).render('post', { blogpost: null, error: 'Error loading post' });
    }
};