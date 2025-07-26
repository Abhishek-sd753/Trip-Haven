const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require('./utility/ExpressError'); 
const {listingSchema, reviewSchema} = require('./schema.js');
module.exports.isLoggedIn=(req,res,next)=> {
    if(!req.isAuthenticated()) {     //if not login then go to login page
         req.session.redirectUrl = req.originalUrl;        //redirectUrl (orignalUrl on which request was given)
    req.flash("error" , "You should be logged in");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; // optional: prevent reuse
    }
    next();
};

module.exports.isOwner = async(req,res,next) => {
    let {id} = req.params;
         let listing = await Listing.findById(id);
         if( !listing.owner._id.equals(res.locals.currUser._id)) {
          req.flash("error", "No Autherization");
         return res.redirect(`/listings/${id}`);
         }
         next();
}

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(msg, 400);  // custom error class
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next)=> {
  const { error } = reviewSchema.validate(req.body.listing);
  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(msg, 400);  // custom error class
  } else {
    next();
  } 
}

module.exports.isReviewAuthor = async(req,res,next) => {
    let {id, reviewId} = req.params;
         let review = await Review.findById(reviewId);
         if( !review.author._id.equals(res.locals.currUser._id)) {
          req.flash("error", "No Autherization");
         return res.redirect(`/listings/${id}`);
         }
         next();
}   