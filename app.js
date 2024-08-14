const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const cors = require('cors');
require('dotenv').config();
const MONGOURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;



mongoose
    .connect(MONGOURI)
    .then(() => {
        console.log("Database is connected successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    }).catch((error) => console.log(error));



//Middlerwares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);


//ROUTES
app.get('/', (req,res) => {
    res.send('We are on home');
});


//Connect To DB







