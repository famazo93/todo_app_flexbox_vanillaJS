const express = require('express');
const app = express();
const todo = require('./database.js');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 3000;

const staticFolder = path.join(__dirname, '..', 'frontend');
app.use(express.static(staticFolder));

app.use('', (req, res, next) => {
    console.log('Received a request');
    next();
})

app.use(morgan('dev'));

app.use(bodyParser.json());

app.get('/todo', (req, res, next) => {
    res.send(todo);
})

app.post('/todo', (req, res, next) => {
    const task = req.body;
    todo.todo.push(task);
    res.send(todo);
})

app.delete('/todo/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const indexToRemove = todo.todo.findIndex(task => Number(task.id) === Number(id));
    todo.todo.splice(indexToRemove, 1);
    res.send(todo);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})