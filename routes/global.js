
const express = require('express')
const path = require('path');
const User = require('../Modals/User');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware')


router.get('/', (req, res)=>{
    res.sendFile('home.html', {root: path.join(__dirname, '../views/')})
})

router.get('/users',[AuthMiddleware],  function(req, res){
    User.find()
        .then((data)=>{
            res.header({'Content-Type': 'application/json'})
            res.send(data)
        })
        .catch(()=>res.send('error'))
})


router.get('/questions', AuthMiddleware, (req, res)=>{
    if(req.session.authenticated){
        res.write('you are authenticated by session too')
    }else{
        res.write('you ar not authenticated by session')
        res.write('         -------------------------------------   ')
    }
    
    fetch("https://opentdb.com/api.php?amount=3")
        .then((questions)=>{
            return questions.json()
        }).then((data)=>{


            res.write(JSON.stringify(data))
            res.write("         -------------------------------------   ")

            res.end(JSON.stringify(res.locals.user))
            //res.sendFile('questions.html', {root: path.join(__dirname, '../views/')})
        })

})


router.get('/posts', async (req, res)=>{  
    let posts = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
    res.send(posts)
})



module.exports = router
