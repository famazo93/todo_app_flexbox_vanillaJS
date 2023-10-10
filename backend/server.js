const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const env = require('dotenv');
env.config();

const mongoose = require('mongoose');
const User = require('./model/User.js');
const Todo = require('./model/Todo.js');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
    next()
})

app.get('/todo/:username', async (req, res, next) => {
    try {
        const username = req.params.username;
        const todos = await Todo.find({user: username});
        res.send({todos})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"});
    }
})

app.get('/todo/:username/:stage', async (req, res, next) => {
    try {
        const {username, stage} = req.params;
        const todos = await Todo.find({user: username, stage: stage});
        res.send({todos});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"});
    }
})

app.post('/authentication', async (req, res, next) => {
    const {username, password} = req.body.userToCheck;
    const user = await User.findOne({username: username});

    if (user) {
        if (bcrypt.compare(password, user.password)) {
            res.send({status: true, msg: "Successful login"});
        } else {
            res.send({status: false, wrong: "password"});
        }
    } else {
        res.send({status: false, wrong: "username"});
    }
})

app.post('/todos/:username', async (req, res, next) => {
    try {
        const {id, title, description, deadline, priority, stage} = req.body;
        const task = {
            id,
            user: req.params.username,
            title,
            description,
            deadline,
            priority,
            stage
        };
        await Todo.create(task);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"});
    }
    
})

app.delete('/todos/:username/:id', async (req, res, next) => {
    try {
        await Todo.findOneAndDelete({user: req.params.username, id: req.params.id});
        res.status(204).send({status: "DONE"});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"});
    }
})

app.patch('/todos/:username/:id', async (req, res, next) => {
    try {
        const {id, title, description, deadline, priority, stage} = req.body;
        const todo = await Todo.findOne({id: id});
        const newTodo = {
            id,
            user: req.params.username,
            title: title ? title : todo.title,
            description: description ? description : todo.description,
            deadline: deadline ? deadline : todo.deadline,
            priority: priority ? priority : todo.priority,
            stage: stage ? stage : todo.stage,
        }

        await Todo.findOneAndReplace({id: id}, newTodo);
        res.send({msg: "OK"});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"});
    }
})

app.post('/login/newUser', async (req, res, next) => {
    const { email, username, password } = req.body;
    const users = await User.find();
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
    const newId = Number(lastId) + 1;

    let doesUsernameExist = false;
    let doesEmailExist = false;

    for (let user of users) {
        if (user.email === email) {
            doesEmailExist = true;
        };
        if (user.username === username) {
            doesUsernameExist = true;
        }
    }
    if (!doesEmailExist && !doesUsernameExist) {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const newUser = {
                id: newId.toString(),
                email,
                username,
                password: hash
            };
            await User.create(newUser);
            res.send({msg: "new user added"})
        })
    } else {
        if (doesUsernameExist) {
            res.send({msg: "Username already exists"});
        } else {
            res.send({msg: "Email address already registered"});
        }
    }
})

//Server production assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join("../client/dist")))
    app.get("*", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'dist'))
    })
}

mongoose.connect(process.env.MONGO_KEY).then(() => {
    console.log('Connection to the database successful!');
    app.listen(port, () => {
        console.log(`App is running on port: ${port}`);
    })
}).catch((err) => {
    console.log(err);
})