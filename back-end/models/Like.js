const db = require('mongoose');

const likeSchema = new db.Schema({
    user_id: { type: db.Schema.Types.ObjectId, ref: 'User', required: true },
    review_id: { type: db.Schema.Types.ObjectId, ref: 'Review', required: true },
})

const Like = db.model('Like', likeSchema);
module.exports = Like;