const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/authentication', async (req, res, next) => {
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

router.post('/newUser', async (req, res, next) => {
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

module.exports = router;