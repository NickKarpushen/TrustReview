const db = require('mongoose');

const categorySchema = new db.Schema({
    name: {type: String, required: true, unique: true},
    company_count: {type: Number, default: 0},
})

const Category = db.model('Category', categorySchema);
module.exports = Category;