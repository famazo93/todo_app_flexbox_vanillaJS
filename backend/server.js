const express = require('express');
const app = express();
const todo = require('./database.js');
const path = require('path');

const PORT = 3000;

const staticFolder = path.join(__dirname, '..', 'frontend');
app.use(express.static(staticFolder));

app.use('', (req, res, next) => {
    console.log('Received a request');
    next();
})

app.get('/todo', (req, res, next) => {
    res.send(todo);
})













app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})