const path = require('path')
const User = require('../Modals/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleErrors = (err)=>{
    console.log(err.message, err.code)
    let errors = {email :"", password: ""}
    if(false){

    }
}


module.exports = {

    signup_get(req, res){
        res.sendFile('auth/signup.html', {root: path.join(__dirname, '../views/')})
    },

    signup_post(req, res){
        const {name, email, password} = req.body
            
        User.create({
            name, email, 
            password
        }).then((user)=>{

            res.send(user)
        }).catch((err)=>{
            handleErrors(err)            
            res.status(400).send("error user not created")    
        })
    },

    login_get(req, res){
        res.sendFile('auth/login.html', {root: path.join(__dirname, '../views/')})
    },

    
    async login_post(req, res){
        const {email, password} = req.body        


        const user = await User.findOne({ email })

        // check if password is correct
        let matched = bcrypt.compareSync(password, user.password)
        

        //res.setHeader('Set-Cookie', "user_token=some-random-token")

        // create the json web token and send it back
        if(matched){
            // authenticate the user by session
            req.session.authenticated = true


            // authenticate the user by jwt
            const payload = { id : user._id}
            const token = jwt.sign(payload, 'secret-private-key', {
                expiresIn : 3 * 24 * 60 * 60 // 3 days            
            })
            res.cookie('user-jwt', token, {maxAge: 3 * 24 * 60 * 60 * 1000})    
            res.send({
                id : user._id,
                user,
                token :token
            })
        }else{
            res.send({
                message :'wrong password'
            })
        }


    },


    logout_get(req, res){
        res.cookie('user-jwt', '', {maxAge: 1})
        res.redirect('/')
    }

}