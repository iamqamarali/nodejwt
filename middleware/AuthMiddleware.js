const Jwt = require('jsonwebtoken');
const User = require('../Modals/User');


const AuthMiddleware = async (req, res, next)=>{
    const token = req.cookies['user-jwt']
    
    if(token){
        Jwt.verify(token, 'secret-private-key', async function(err, decodedToken){
            if(err){
                res.locals.user = null
                next()

                res.redirect('/login')
            }
            else{
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next();
            }
        })

    }else{
        res.locals.user = null
        res.redirect('/login')
    }


}



module.exports = AuthMiddleware;