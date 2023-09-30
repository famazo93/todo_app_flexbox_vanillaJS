const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const todoSchema = new Schema({
    id: String,
    user: String,
    title: String,
    description: String,
    deadline: String,
    priority: String,
    stage: String
})

module.exports = model('Todo', todoSchema)