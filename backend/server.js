const express = require('express');
const app = express();
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
    const userID = req.session.user.id;
    fs.readFile('./database/todos.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const {allTodos} = JSON.parse(data);
            res.send(allTodos[userID]);
        }
    })
})

app.post('/todos', (req, res, next) => {
    const userID = req.session.user.id;
    const task = req.body;

    fs.readFile('./database/todos.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const { allTodos } = JSON.parse(data);
            allTodos[userID].push(task);

            fs.writeFile('./database/todos.json', JSON.stringify({allTodos}), (err) => {
                if (err) {
                    throw err;
                } else {
                    res.send(allTodos);
                }
            })
        }
    })
})

app.delete('/todos/:id', (req, res, next) => {
    fs.readFile('./database/todos.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const { allTodos } = JSON.parse(data);
            const todoID = req.params.id;
            const userID = req.session.user.id;
            let todoIndex = null;
            for (let i = 0; i < allTodos[userID].length; i++) {
                if (allTodos[userID][i].id === todoID) {
                    todoIndex = i;
                }
            }
            if (todoIndex !== null) {
                allTodos[userID].splice(todoIndex, 1);

                fs.writeFile('./database/todos.json', JSON.stringify({allTodos}), (err) => {
                    if (err) {
                        throw err;
                    } else {
                        res.status(204).send({status: "DONE"});
                    }
                })
            } else {
                res.status(404).send({state: "todo not found"});
            }
        }
    })
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
                        id: selectedUser.id,
                        username,
                        password,
                    };
                    res.redirect('todos');
                } else {
                    res.status(403).send('Wrong password');
                }
            }
        }
    })
})

app.get('/profile', (req, res, next) => {
    res.render('profile', { id: req.session.user.id, username: req.session.user.username, password: req.session.user.password });
})

app.post('/profile/edit/:id', (req, res, next) => {
    fs.readFile('./database/users.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const { users } = JSON.parse(data);
            const userID = req.params.id;
            const { username, passwordOld, passwordNew, _method } = req.body;
            let userIndex = null;
            for (let i = 0; i < users.length; i++) {
                if (Number(users[i].id) === Number(userID)) {
                    userIndex = i;
                }
            }
            if (_method === 'PATCH') {
                if (userIndex !== null) {
                    if (users[userIndex].password === passwordOld) {
                        users[userIndex] = {
                            id: users[userIndex].id,
                            username: username ? username : users[userIndex].username,
                            password: passwordNew ? passwordNew : users[userIndex].password
                        }

                        fs.writeFile('./database/users.json', JSON.stringify({users}), (err) => {
                            if (err) {
                                throw err;
                            } else {
                                res.status(200).redirect('http://localhost:3000/todos')
                            }
                        })
                    } else {
                        res.status(403).send({state: 'wrong password'});
                    }
                } else {
                    res.status(404).send({state: 'user not found'});
                }
            }
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})