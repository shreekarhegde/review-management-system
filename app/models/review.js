const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: {
            type: String,
            minlength: 2
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})


const Review = mongoose.model('Review', reviewSchema);

reviewSchema.post('save', function(next){
    console.log(this);
})

module.exports = {
    Review
}