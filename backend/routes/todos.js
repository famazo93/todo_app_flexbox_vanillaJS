const express = require('express');
const router = express.Router();
const Todo = require('../model/Todo');

router.get('/:username', async (req, res, next) => {
    try {
        const username = req.params.username;
        const todos = await Todo.find({user: username});
        res.send({todos})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"});
    }
})

router.get('/:username/:stage', async (req, res, next) => {
    try {
        const {username, stage} = req.params;
        const todos = await Todo.find({user: username, stage: stage});
        res.send({todos});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"});
    }
})

router.post('/:username', async (req, res, next) => {
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

router.delete('/:username/:id', async (req, res, next) => {
    try {
        await Todo.findOneAndDelete({user: req.params.username, id: req.params.id});
        res.status(204).send({status: "DONE"});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"});
    }
})

router.patch('/:username/:id', async (req, res, next) => {
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

module.exports = router;