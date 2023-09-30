const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    id: String,
    email: String,
    username: String,
    password: String
})

module.exports = model('User', userSchema);