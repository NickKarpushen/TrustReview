const Company = require('../models/Company');
const Category = require('../models/Category');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getCompany = async(req, res) => {
    const {userId} = req.body
    try {
        const company = await Company.findOne({userId})
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        const category = await Category.findById(company.cat_id)

        const obj = company.toObject();

        obj.cat_name = category.name;

        res.status(200).json({company: obj, message: 'Get company data'})
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get company'});
    }
}

const updateCompany = async(req, res) => {
    try {
        const { companyId, 
            company_name, 
            website_link,
            phone_number,
            about_company,
            category } = req.body;
        
        const company = await Company.findById(companyId);
        const lastCategory = await Category.findById(company.cat_id);
        const futureCategory = await Category.findById(category);

        if (!company) return res.status(404).json({ message: 'User not found' });

        if (category !== String(company.cat_id)){
            lastCategory.company_count -= 1;
            await lastCategory.save();

            futureCategory.company_count += 1;
            await futureCategory.save();
        }

        if (company_name != 'undefined') company.company_name = company_name;
        if (website_link != 'undefined') company.website_link = website_link;
        if (phone_number != 'undefined') company.phone_number = phone_number;
        if (about_company != 'undefined') company.about_company = about_company;
        if (category != 'undefined') company.cat_id = category;

        if (req.file) {
            company.logo = {
                data: req.file.buffer.toString('base64'),
                contentType: req.file.mimetype
            };
        }

        await company.save();

        res.status(200).json({company, message: 'Company updated successfully'})
    } catch (error){
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {getCompany, updateCompany, upload};