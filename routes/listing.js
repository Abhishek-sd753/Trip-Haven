const express = require('express');
const router = express.Router();
const wrapAsync = require('../utility/Wrapasync'); 
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');
const listingController = require("../controllers/listings.js");
//validate lisiting



router.route('/')
    .get( wrapAsync(listingController.index))  //index Route
    .post(validateListing, isLoggedIn,wrapAsync(listingController.createListing)); //add new listing

      //direct to form for new listing
router.get("/new",isLoggedIn, listingController.renderNewForm );

router.route('/:id') 
    .get(wrapAsync(listingController.showListing)) //show individual listing
    .put( isLoggedIn, isOwner, validateListing, wrapAsync(listingController.editListing)) //edit the post
    .delete(isOwner,isLoggedIn, listingController.deleteListing) //delete the post




//edit method form
router.get("/:id/edit", isLoggedIn, listingController.editForm); 

 module.exports = router; 