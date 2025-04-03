const db = require('mongoose');

const companySchema = new db.Schema({
    company_name: {type: String, required: true},
    about_company: {type: String, default: null},
    work_email: {type: String, required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique: true},
    phone_number: {type: String, required: true},
    website_link: {type: String, default: null},
    number_employment: {type: String, default: null},
    rating: {type: Number, default: 0},
    reviews: {type: Number, default: 0},
    user_id: { type: db.Schema.Types.ObjectId, ref: 'User', required: true },
    cat_id: { type: db.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdAt: {type: Date, default: Date.now}
})

const Company = db.model('Company', companySchema);
module.exports = Company;