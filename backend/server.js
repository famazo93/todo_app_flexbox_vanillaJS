const express = require('express');
const app = express();
const todo = require('./database/database.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const store = new session.MemoryStore();
const users = require('./database/users.js');

const PORT = 3000;

app.use(express.static('../frontend'));

app.set('view engine', 'ejs');

app.use('', (req, res, next) => {
    console.log('Received a request');
    next();
})

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(express.urlencoded())

app.use(session({
    secret: 'test',
    cookie: {
        maxAge: 1000,
        secure: true,
        sameSite: 'none'
    },
    resave: false,
    saveUninitialized: false,
    store
}))

const ensureAuthentication = (req, res, next) => {
    if (req.session.authenticated) {
        console.log('You are authenticated')
        next()
    } else {
        res.render('login')
    }
}

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

app.get('/login', (req, res, next) => {
    res.render('login');
})

app.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    users.findByUsername(username, (err, user) => {
        if (!user) {
            res.status(403).send('No user found')
        } else {
            if (user.password === password) {
                req.session.authenticated = true;
                req.session.user = {
                    username,
                    password,
                };
                res.redirect('/');
            } else {
                res.status(403).send('Wrong password');
            }
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})