const express = require('express');
const router = express.Router();

const { User } = require('../models/user');

router.get('/:id', (req, res) => {
    User.findOne({ _id: req.params.id }).populate('reviews').then((user) => {
        res.send(user);
    }).catch((err) =>{
        res.send(err);
    })
})

router.get('/', (req, res) => {
    User.find().then((users) => {
        res.send(users)
    }).catch((err) => {
        res.send(err);
    });
})

router.post('/login', (req, res) => {
    let body = req.body;
    let user = new User(body);
    user.save().then((user) => {
        return user.generateToken();
        }).then((user) => {
            res.send(user);
        }).catch((err) => {
        res.send(err);
    })
})

module.exports = {
    usersController: router
}