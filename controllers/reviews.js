const Listing = require('../models/listing');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    let {id} = req.params;
    const {review} = req.body;
    const listing = await Listing.findById(id);
    let newReview = new Review(review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  // Remove reference to the review from the listing
    await Review.findByIdAndDelete(reviewId); // Delete the review from the Review collection
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};