const Category = require('../models/Category')

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
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error authenticating user'});
    }
}

const getCategories = async(req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get categories'});
    }
}

module.exports = {createCategory, getCategories};