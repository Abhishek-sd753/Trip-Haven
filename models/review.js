const mongoose = require('mongoose');
const schema = mongoose.Schema;


// Listing schema
const reviewSchema = new schema({
    comment: {type: String, required: true},
    rating: {
        required: true,
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: schema.Types.ObjectId,
        ref: "User",
    }
});


module.exports = mongoose.model('Review', reviewSchema);