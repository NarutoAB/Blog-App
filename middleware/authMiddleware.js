const User = require('../models/User');

module.exports = (req,res,next)=>{
    if (!req.session.userId) {
        return res.redirect('/');
    }

    User.findById(req.session.userId)
    .then(user=>{
        if(!user) return res.redirect('/');
        next();
    })
    .catch((Err)=>{
        console.error(Err);
        res.redirect('/');
    });
};