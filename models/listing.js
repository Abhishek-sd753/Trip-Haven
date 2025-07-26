const mongoose = require('mongoose');  //require mongoose
const Schema = mongoose.Schema;
const Review = require('./review.js')
// Define schema
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100  // Increased max length to accommodate longer titles
    },
    description: {
        type: String,
        required: true,
        maxLength: 500  // Increased max length for longer descriptions
    },
    image: {
        
        url: {
            type: String,
            default: 'https://images.unsplash.com/photo-1631988700156-0920ca45c8b9?q=80&w=2070&auto=format&fit' +
                '=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'  // Reference to Review model
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
  
listingSchema.post("findOneAndDelete", async(listing) => {   //to delete all the reviews when deleting a list
        if(listing) {
            await Review.deleteMany({_id : {$in: listing.reviews}})
        }
    })

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;