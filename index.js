require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');

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

//Redirected towards routes 
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error while running on PORT "+err);
        return;
    }
    console.log("Running on Port : "+port);
})