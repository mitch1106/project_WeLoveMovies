const router = require('express').Router({mergeParams: true});
const theatersRouter = require('../theaters/theaters.router');
const reviewsRouter = require('../reviews/reviews.router');
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.use('/:movieId/theaters', theatersRouter);
router.use('/:movieId/reviews', reviewsRouter);

router.route('/').get(controller.list).all(methodNotAllowed);

router.route('/:movieId').get(controller.read).all(methodNotAllowed);

module.exports = router;
