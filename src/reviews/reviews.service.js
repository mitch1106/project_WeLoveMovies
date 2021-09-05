const db = require('../db/connection')

async function destroy(reviewId) {
    return db('reviews').where({ review_id:reviewId }).del();
}


async function list(movie_id) {
    return db('reviews')
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(setCritic)));
}

async function read(reviewId) {
    return db('reviews').where({ review_id:reviewId}).first()
}

async function readCritic(critic_id) {
    return db('critics').where({ critic_id }).first();
}

async function setCritic(review) {
   review.critic = await readCritic(review.critic_id);
   return review
}

async function update(review) {
    return db('reviews')
    .where({ review_id: review.review_id})
    .update(review, '*')
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
       destroy,
       list,
       read,
       update,
}