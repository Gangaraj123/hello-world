// index.js, starting point of the app
const express = require('express'); // importing express
const fileUpload = require('express-fileupload');
const path = require('path')
const Blog = require('./Models/Blog');
const ConnectToMongoose = require('./Models/db');
const app = express(); // creating an instance of express

ConnectToMongoose(app);// connecting to db

// registering view engine
app.set('view engine', 'ejs');

// middleware to get fetchrequest in json form
app.use(express.json())

//middle ware to get the data submitted by forms
app.use(express.urlencoded({ extended: true }));

// using Components folder as static
app.use(express.static(path.join(__dirname, 'Components')))

// middleware for managing file uploads(images in this case)
app.use(fileUpload())

//middlware for blog route
app.use('/blog', require("./Routes/BlogRoutes"));

// middleware for login and singup
app.use('/auth', require("./Routes/AuthRoutes"));


//Home page
app.get('/', (req, res) => {
    Blog.find()
    .then(
        result=>{
            res.render('../Templates/basic', { page: "Home",blogs:result})
        }
    )
})

// Notfound page for other urls
app.get('/*', (req, res) => {
    res.render('../Templates/NotFound')
})

    