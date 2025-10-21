const User = require('../models/User');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body)
        .then(() => res.redirect('/'))
        .catch(err => {
            // Extract Mongoose validation errors
            const validationErrors = Object.keys(err.errors).map(
                key => err.errors[key].message
            );

            // Store in session to display on the register page
            req.flash('validationErrors',validationErrors);

            // Redirect back to the register form
            res.redirect('/auth/register');
        });
};
