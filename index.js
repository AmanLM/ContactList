require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

//Mongo-store
const MongoStore = require('connect-mongo')
//cookie-parser
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Database
require('./config/mongoose');

//Ejs-setup
app.set('view engine', 'ejs');

// For Layouts
app.use(expressLayouts);

//for styling static files
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//static files
app.use(express.static('./assets'));

//MongoStore stores session cookies
app.use(session({
    name: 'MovieApp',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : MongoStore.create(
        {
            mongoUrl : 'mongodb+srv://sampark:LtI2Zr4L80CwDvNN@samparkproject.2c72sm8.mongodb.net/?retryWrites=true&w=majority',
            autoRemove : 'disabled'
        },function(err){
            console.log(err || "Connection is fine");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Redirected towards routes 
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error while running on PORT "+err);
        return;
    }
    console.log("Running on Port : "+port);
})
