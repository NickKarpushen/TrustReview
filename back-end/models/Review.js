const db = require('mongoose');
const Like = require('./Like');

const reviewSchema = new db.Schema({
    title: {type: String, default: '', maxlength: 80},
    text: {type: String, default: '', maxlength: 320},
    rating: {type: Number, required: true},
    image: {
        data: {type: String, default: null},
        contentType: {type: String, default:null}
    },
    user_id: { type: db.Schema.Types.ObjectId, ref: 'User', required: true },
    company_id: { type: db.Schema.Types.ObjectId, ref: 'Company', required: true },
    parent_id: { type: db.Schema.Types.ObjectId, ref: 'Review', default: null},
    likes_count: {type: Number, default: null},
    replies_count: {type: Number, default: null},
    createdAt: {type: Date, default: Date.now}
})

reviewSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Like.deleteMany({ review_id: doc._id });
        await Review.deleteMany({ parent_id: doc._id });
    }
});

const Review = db.model('Review', reviewSchema);
module.exports = Review;