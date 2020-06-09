const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// Env activation
dotenv.config();

// Middlewares
app.use(express.json());

// Import Routes
const authRoute = require('./rout/auth');


// Route Middleware : add prefix
app.use('/api/user',authRoute);


// connect to DB
mongoose.connect(
    process.env.DB_CONNECT
    ,{ useNewUrlParser: true, useUnifiedTopology: true }
    ,()=>{console.log('Connected to DB!')});




const port = process.env.PORT || 5000;
app.listen(port,()=>{console.log('Server up and running on port '+port+'!')})