const express = require('express');
const app = express();
const todo = require('./database.js');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3000;

const staticFolder = path.join(__dirname, '..', 'frontend');
app.use(express.static(staticFolder));

app.use('', (req, res, next) => {
    console.log('Received a request');
    next();
})

app.use(bodyParser.json());

app.get('/todo', (req, res, next) => {
    console.log('Listing all tasks')
    res.send(todo);
})

app.post('/todo', (req, res, next) => {
    console.log('Adding task');
    const task = req.body;
    todo.todo.push(task);
    res.send(todo);
})

app.delete('/todo/:id', (req, res, next) => {
    const id = Number(req.params.id);
    console.log(`Removing task with ID: ${id}`);
    const indexToRemove = todo.todo.findIndex(task => Number(task.id) === Number(id));
    console.log(indexToRemove);
    todo.todo.splice(indexToRemove, 1);
    res.send(todo);
})












app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})