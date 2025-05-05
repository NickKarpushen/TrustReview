const Review = require('../models/Review');
const Company = require('../models/Company');
const User = require('../models/User');
const Category = require('../models/Category');
const Like = require('../models/Like');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createReview= async(req, res) => {
    try {

        let {title, text, rating, user_id, company_id, parent_id} = req.body;

        if (title == 'undefined') title = '';
        if (text == 'undefined') text = '';

        rating = Number(rating);

        const review = await new Review({
            title: title,
            text: text,
            rating: rating,
            user_id: user_id,
            company_id: company_id,
            parent_id: parent_id
        });

        const company = await Company.findById(company_id);
        const user = await User.findById(user_id);
        const category = await Category.findById(company.cat_id);

        company.rating = ((company.rating * company.review_count) + rating) / (company.review_count + 1);
        company.review_count += 1;

        user.review_count += 1;

        category.review_count += 1;

        if (req.file) {
            review.image = {
                data: req.file.buffer.toString('base64'),
                contentType: req.file.mimetype
            };
        }

        await review.save();
        await company.save();
        await user.save();
        await category.save();

        res.status(200).json({message: 'Review created successfully'})
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get company'});
    }
}

const deleteReview = async(req, res) => {
    try{
        const {review_id} = req.query;

        const review = await Review.findOneAndDelete( { _id: review_id} );
        const company = await Company.findOne( { _id: review.company_id} );
        const category = await Category.findById(company.cat_id);
        const user = await User.findById(review.user_id);

        company.rating = ((company.rating * company.review_count) - review.rating) / (company.review_count === 1 ? 1 : company.review_count - 1);
        company.review_count -= 1;

        category.review_count -= 1;

        user.review_count -= 1;

        await company.save();
        await user.save();
        await category.save();

        res.status(200).json({message: "Review deleted successfully"})
    }catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get company'});
    }
}

const getUserReviews = async(req, res) => {
    try {
        const { user_id } = req.query;

        const reviews = await Review.find({ 
            user_id, 
            parent_id: null 
        }).sort({ createdAt: -1 });
        const newReviews = [];

        for (const review of reviews) {
            const company = await Company.findById(review.company_id).lean();
            const obj = review.toObject();

            obj.company_name = company?.company_name || '';
            obj.company_logo = company?.logo || '';
            obj.website_link = company?.website_link || '';

            newReviews.push(obj);
        }

        res.status(200).json({ newReviews, message: "Get user reviews successfully" });

    } catch (error){
        res.status(500).json({ message: "Server error" });
    }
}

const getReviews = async(req, res) => {
    try {
        const { company_id, user_id } = req.query;

        const reviews = await Review.find({ 
            company_id, 
            parent_id: null 
        }).sort({ createdAt: -1 });
        
        const newReviews = [];

        for (const review of reviews) {
            const user = await User.findById(review.user_id).lean();
            const obj = review.toObject();

            const likeExists = await Like.findOne({
                user_id: user_id,
                review_id: review._id
            });

            obj.user_name = user.name;
            obj.user_surname = user.surname;
            obj.user_email = user.email;
            obj.user_avatar = user?.avatar;
            obj.likeExists = likeExists ? true : false;

            newReviews.push(obj);
        }

        res.status(200).json({ newReviews, message: "Get reviews successfully" });

    } catch (error){
        res.status(500).json({ message: "Server error" });
    }
}

const updateReview = async(req, res) =>{
    try{
        const {title, text, review_id} = req.body;

        const review = await Review.findById(review_id);

        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (title != 'undefined') review.title = title;
        if (text != 'undefined') review.text = text;

        if (req.file) {
            review.image = {
                data: req.file.buffer.toString('base64'),
                contentType: req.file.mimetype
            };
        }

        await review.save();

        res.status(200).json({message: 'Review updated successfully'})
    }catch{
        res.status(500).json({ message: "Server error" });
    }
}

const createReply = async(req, res) => {
    try {

        let {text, user_id, company_id, parent_id} = req.body;

        if (text === null || text === '') return res.status(404).json({message: 'Text is empty'}) 

        rating = 0;

        const review = await new Review({
            text: text,
            rating: rating,
            user_id: user_id,
            company_id: company_id,
            parent_id: parent_id
        });

        const parentReview = await Review.findById(parent_id);

        parentReview.replies_count += 1;

        await review.save();
        await parentReview.save();

        res.status(200).json({message: 'Reply created successfully'})
    }
    catch (error){
        res.status(500).json({message: 'Error server'});
    }
}

const updateReply = async(req, res) =>{
    try{
        const {reply_id, text} = req.body;

        const reply = await Review.findById(reply_id);

        if (text === null || text === '') return res.status(404).json({message: 'Text is empty'})
            
        reply.text = text;

        reply.save();

        res.status(200).json({message: 'Reply updated successfully'})
    }catch (error){
        res.status(500).json({message: 'Error server'});
    }
}

const deleteReply = async(req, res) => {
    try{
        const {reply_id} = req.query;

        const reply = await Review.findOneAndDelete( { _id: reply_id} );
        const review = await Review.findOne( { _id: reply.parent_id} );

        review.replies_count -= 1;

        await review.save();

        res.status(200).json({message: "Review deleted successfully"})
    }catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get company'});
    }
}

const getReplies = async(req, res) => {
    try {
        const { parent_id } = req.query;

        const replies = await Review.find({ 
            parent_id: parent_id 
        }).sort({ createdAt: -1 });
        
        const newReplies = [];

        for (const reply of replies) {
            const user = await User.findById(reply.user_id).lean();
            const obj = reply.toObject();

            obj.user_name = user.name;
            obj.user_surname = user.surname;
            obj.user_email = user.email;
            obj.user_avatar = user?.avatar;
            obj.user_id = user?._id;

            newReplies.push(obj);
        }

        res.status(200).json({ newReplies, message: "Get replies successfully" });

    } catch (error){
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = 
{
    createReview, 
    deleteReview, 
    getUserReviews, 
    getReviews, 
    updateReview, 
    createReply, 
    getReplies, 
    updateReply,
    deleteReply,
    upload
};