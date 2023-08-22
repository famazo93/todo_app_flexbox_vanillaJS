const express = require('express');
const app = express();
const todo = require('./database/database.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const store = new session.MemoryStore();
const fs = require('fs');

const PORT = 3000;

app.use(express.static('../frontend'));

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(express.urlencoded())

app.use(session({
    secret: 'test',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: false,
    store: store,
}))

app.get('/todo', (req, res, next) => {
    res.send(todo);
})

app.post('/todos', (req, res, next) => {
    const task = req.body;
    todo.todo.push(task);
    res.send(todo);
})

app.delete('/todos/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const indexToRemove = todo.todo.findIndex(task => Number(task.id) === Number(id));
    todo.todo.splice(indexToRemove, 1);
    res.send(todo);
})

app.get('/login/newUser', (req, res, next) => {
    res.render('newUser')
})

app.get('/login', (req, res, next) => {
    if (!req.session.authenticated){
        res.render('login');
    } else {
        res.redirect('todos');
    }
})

app.get('/todos', (req, res, next) => {
    console.log(req.session);
    if (req.session.authenticated) {
        res.render('todos');
    } else {
        res.redirect('login');
    }
})

app.post('/login/newUser', (req, res, next) => {
    const { username, password } = req.body;
    fs.readFile('./database/users.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const { users } = JSON.parse(data);
            const lastId = users[users.length - 1].id;
            users.push({
                id: Number(lastId) + 1,
                username,
                password
            })
            fs.writeFile('./database/users.json', JSON.stringify({users}), (err) => {
                if (err) {
                    throw err
                } else {
                    res.render('login');
                }
            })
        }
    })
})

app.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    fs.readFile('./database/users.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const { users } = JSON.parse(data);
            let selectedUser = null;
            users.forEach(user => {
                if (user.username === username) {
                    selectedUser = user;
                }
            });
            if (!selectedUser) {
                res.status(404).send('No user found');
            } else {
                if (selectedUser.password === password) {
                    req.session.authenticated = true;
                    req.session.user = {
                        username,
                        password,
                    };
                    res.redirect('todos');
                } else {
                    res.status(403).send('Wrong password');
                }
            }
        }
        console.log(req.session);
    })
})

app.get('/profile', (req, res, next) => {
    res.render('profile', { username: req.session.user.username, password: req.session.user.password });
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})