const express = require('express');
const router = express();
const { reviewsController } = require('../app/controllers/reviews_controller');
const { usersController } = require('../app/controllers/users_controller');

router.use('/reviews', reviewsController);
router.use('/users', usersController);

module.exports = {
    routes: router
}