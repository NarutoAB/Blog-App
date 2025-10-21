const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const aboutPageController = require('./controllers/aboutPage');
const contactPageController = require('./controllers/contactPage');
const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const validateMiddleWare = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const flash = require('connect-flash');


// database connect
const URI = 'mongodb+srv://Sam:Sam371@cluster0.yuw2ucz.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(URI)
.then(()=>console.log('mongoDB connected.'))
.catch(err=>console.log(err.message));

// Middlewares & configuration method
app.use(fileUpload());
app.use(express.json());               
app.use(express.urlencoded({ extended: true })); 
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = {
        validationErrors: req.flash('validationErrors'),
        success: req.flash('success'),
        error: req.flash('error')
    };
    next();
});
global.loggedIn = null;
app.use((req,res,next)=>{
    loggedIn = req.session.userId;
    next();
});

// Routes/ Request handlers
app.get('/',homeController);

app.get('/about',aboutPageController);

app.get('/contact',contactPageController);

app.get('/post/:id',getPostController);

app.get('/posts/new',authMiddleware,newPostController);

app.post('/posts/store',authMiddleware,validateMiddleWare,storePostController);

app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController);

app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware,loginController);

app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController);

app.get('/auth/logout',logoutController);

app.use((req,res)=>res.render('notfound'));

// Export the app for Vercel serverless functions
module.exports = app;

// Only start the server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    let port = process.env.PORT;
    if(port == null || port ==""){
        port = 4000;
    }
    
    app.listen(port,()=>{
        console.log(`App listening on port ${port}`);
    });
}

