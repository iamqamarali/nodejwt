const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const AuthMiddleware = require('./middleware/AuthMiddleware');



const app = express();
app.listen(3000, function(){
    console.log('localhost:3000')
})

// mongodb connection
const url = 'mongodb://localhost:27017/node-jwt?directConnection=true'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 // Use IPv4, skip trying IPv6
}

mongoose.set('strictQuery', true)
mongoose.connect(url, options)
        .then(function(){ console.log("mongodb connected") })
        .catch(function(){ console.log("mongodb connection failed") })

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }

    
}))

// routes
const authRouter = require('./routes/auth')
const globalRouter = require('./routes/global')

app.use(authRouter)
app.use(AuthMiddleware, globalRouter);

