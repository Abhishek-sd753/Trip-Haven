const express = require('express');
const router = express.Router({ mergeParams: true }); //true concept    
const wrapAsync = require('../utility/Wrapasync');
const Review = require('../models/review');
const Listing = require('../models/listing'); 
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js')
const reviewController = require("../controllers/reviews.js");

//Review 
router.post('/', validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;