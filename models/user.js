const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // match: /^([a-zA-Z0-9@*#]{8,15})$/
    },
    name: {
        type: String
    }

}, { timestamps: true } )

const User = mongoose.model('User', userSchema)

module.exports = User