const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true, // petq e lini mi hat email te che error kta
    },
    password: {
        type: String,
        require: true,
    }
})



module.exports = mongoose.model('users', userSchema)
