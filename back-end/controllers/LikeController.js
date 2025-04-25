const Like = require('../models/Like');
const Review = require('../models/Review')

const createLike = async(req, res) => {
    try {
        const { user_id, review_id } = req.body;

        const like = await Like.findOne({
            user_id: user_id,
            review_id: review_id
        });

        if (like){
            return res.status(400).json({message: 'like already exists'});
        }

        const review = await Review.findById(review_id);
        const newLike = new Like({user_id, review_id});

        review.likes_count += 1;

        await newLike.save();
        await review.save();

        res.status(201).json({message: "Like created successfully"});
    }
    catch (error){ 
        res.status(500).json({message: 'Error authenticating user'});
    }
}

const deleteLike = async(req, res) => {
    try {
        const { user_id, review_id } = req.query;

        const like = await Like.findOne({
            user_id: user_id,
            review_id: review_id
        });

        if (!like){
            return res.status(400).json({message: 'like dont found'});
        }

        const review = await Review.findById(review_id);
        await Like.findOneAndDelete( {user_id: user_id, review_id: review_id} );

        review.likes_count == 1 ? review.likes_count = null : review.likes_count -= 1;

        await review.save();

        res.status(200).json({ message: "Like deleted successfully" });
    }
    catch (error){ 
        res.status(500).json({message: 'Error authenticating user'});
    }
}

module.exports = {createLike, deleteLike};