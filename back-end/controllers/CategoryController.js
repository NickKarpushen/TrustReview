const Category = require('../models/Category')
const Company = require('../models/Company')

const createCategory = async(req, res) => {
    try {
        const { name } = req.body;

        const category = await Category.findOne({name});
        
        if (category){
            return res.status(400).json({message: 'Category already exists'});
        }

        const newCategory = new Category({name});

        await newCategory.save();

        res.status(201).json({message: "Category created successfully"});
    }
    catch (error){
        res.status(500).json({message: 'Error authenticating user'});
    }
}

const getCategories = async(req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    }
    catch (error){
        res.status(500).json({message: 'Error get categories'});
    }
}

const getCategory = async(req, res) => {
    const {cat_id} = req.query;
    try {
        const category = await Category.findById(cat_id);
        res.status(200).json(category)
    }
    catch (error){
        res.status(500).json({message: 'Error get category'});
    }
}

const topCategories = async(req, res) => {
    try{
        const categories = await Category.find({}).sort({ review_count: -1 }).limit(3).lean();;

        const result = [];

        for (const category of categories) {
            const topCompanies = await Company.find({ cat_id: category._id })
                .sort({ rating: -1 })
                .limit(3)
                .lean();

            if (topCompanies.length > 0) {
                result.push({
                    category,
                    companies: topCompanies
                });
            }
        }
        res.status(200).json(result)
    }catch (error){
        res.status(500).json({message: 'Error get category'});
    }
}


module.exports = {createCategory, getCategories, getCategory, topCategories};