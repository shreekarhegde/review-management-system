const express = require('express');
router = express.Router();
const { Review } = require('../models/review');
const { User } = require('../models/user');
const { authorizeUser } = require('../middlewares/authorization');

router.get('/', (req, res) => {
    Review.find().then((reviews) => {
        res.send(reviews);
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/', (req, res) => {
    let body = req.body;
    let review = new Review(body);
    review.save().then((review) => {
        User.findByIdAndUpdate(req.body.user, {$push: {reviews: review._id}}).then((user) => {
            console.log(user);
        })
        res.send(review);
    }).catch((err) =>{
        res.send(err);
    });
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    console.log(body, "body to update")
    Review.findOneAndUpdate({ _id: id}, {$set: body}, {new: true, runValidators: true}).then((review) => {
        if(!review){
            res.send('review not found')
        }
        res.send({
            review,
            notice: 'review updated successfully'
        })
    })
});

router.delete('/:id', (req, res) => {
    id = req.params.id;
    Review.findByIdAndRemove(id).then((review) => {
        if (review) {
            res.send('this review was deleted');
        } else {
            res.send({ notice: 'review not found' })
        }
    }).catch((err) => {
        res.send(err);
    });})

module.exports = {
    reviewsController: router
}