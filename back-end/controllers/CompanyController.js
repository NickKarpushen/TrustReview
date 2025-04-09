const Company = require('../models/Company')

const getCompany = async(req, res) => {
    const {userId} = req.body
    try {
        const company = await Company.findOne({userId})
        res.status(200).json({company, message: 'Get company data'})
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get company'});
    }
}

module.exports = {getCompany};