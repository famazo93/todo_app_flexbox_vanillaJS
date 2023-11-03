const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const env = require('dotenv');
env.config();

const TodoRouter = require('./routes/todos');
const UserRouter = require('./routes/user');

const mongoose = require('mongoose');

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

app.use('/api/todos', TodoRouter);
app.use('/api/users', UserRouter);

//Server production assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"))
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