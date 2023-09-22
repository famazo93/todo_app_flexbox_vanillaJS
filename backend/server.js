const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const store = new session.MemoryStore();
const fs = require('fs');

const PORT = 3000;

app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next()
})

app.get('/todo/:username', (req, res, next) => {
    const username = req.params.username;
    fs.readFile('./database/todos.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const {allTodos} = JSON.parse(data);
            const todos = {
                todos: allTodos[`${username}`]
            }
            res.send(todos);
        }
    })
})

app.post('/authentication', (req, res, next) => {
    const {username, password} = req.body.userToCheck;
    fs.readFile('./database/users.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const {users} = JSON.parse(data);
            let userFound = false;
            for (let user of users) {
                if (user.username === username) {
                    userFound = true;
                    if (user.password === password) {
                        res.send({status: true, msg: "Successful login"});
                    } else {
                        res.send({status: false, wrong: "password"})
                    };
                }
            };
            if (!userFound) {
                res.send({status: false, wrong: "username"});
            }
        }
    })
});

app.post('/todos/:username', (req, res, next) => {
    const {description, deadline, priority} = req.body;
    const task = {
        id: Date.now(),
        description,
        deadline,
        priority
    }
    const user = req.params.username;
    fs.readFile('./database/todos.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const { allTodos } = JSON.parse(data);
            allTodos[`${user}`].push(task);

            fs.writeFile('./database/todos.json', JSON.stringify({allTodos}), (err) => {
                if (err) {
                    throw err;
                } else {
                    res.status(200).send();
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

app.post('/login/newUser', (req, res, next) => {
    const { email, username, password } = req.body;
    fs.readFile('./database/users.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const { users } = JSON.parse(data);
            const lastId = users[users.length - 1].id;
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
                users.push({
                    id: Number(lastId) + 1,
                    email,
                    username,
                    password
                })
                fs.writeFile('./database/users.json', JSON.stringify({users}), (err) => {
                    if (err) {
                        throw err
                    } else {
                        res.send({msg: "new user added"});
                    }
                })
            } else {}
        }
    })
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