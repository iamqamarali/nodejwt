const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    email : {
        type : String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        unique: [true, "not unique"],
        validate: [ isEmail , 'Please enter a valid email']
    },
    password : {
        type : String,
        required: [true, 'please enter a password'],
        minLength: [6, 'should be minimum of 6 characters']
    }
}, {strict: false})

// fires before saving this modal
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    this.salt = salt;
    next()
})


module.exports = mongoose.model('user', userSchema )