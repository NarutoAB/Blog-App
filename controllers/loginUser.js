const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req,res)=>{
    const { username, password } = req.body;

    User.findOne({ username })
    .then(user => {
        if(!user){
            return res.redirect('/auth/login');
        }
        return bcrypt.compare(password, user.password)
        .then(same => {
            if(same){
                req.session.userId = user._id;
                return res.redirect('/');
            }else{
                return res.redirect('/auth/login');
            }
        });
    })
    .catch(error => {
        console.error(error);
        return res.redirect('/auth/login');
    });
};