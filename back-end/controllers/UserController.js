const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const User = require('../models/User');
const Company = require('../models/Company');
const Category = require('../models/Category');

const JWT_SECRET = "SECRET";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Немає авторизації" });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(403).json({ message: "Невірний токен" });
    }
};

const createUser = async(req, res) => {
    try {
        const { name, surname, email, password, passwordConfirm, role } = req.body;

        const user = await User.findOne({email});
        
        if (user){
            return res.status(400).json({message: 'User already exists'});
        }

        if (password != passwordConfirm){
            return res.status(400).json({message: 'Password not confirmed'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name, surname, email, password: hashedPassword, role});

        await newUser.save();

        res.status(201).json({message: "User created successfully"});
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error authenticating user'});
    }
}

const createBusiness = async(req, res) => {
    try {
        const { name, surname, email, password, passwordConfirm, role,
            company_name, work_email, phone_number, website_link, number_employment, cat_id
        } = req.body;

        console.log(cat_id)

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ message: 'Password not confirmed' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const company = await Company.findOne({ work_email });
        if (company) {
            return res.status(400).json({ message: 'Company already exists' });
        }

        const category = await Category.findById(cat_id);

        const newUser = new User({ name, surname, email, password: hashedPassword, role });
        
        const newCompany = new Company({
            company_name, work_email, phone_number, website_link, number_employment, user_id: newUser._id, cat_id: category._id 
        });

        await newUser.validate();
        await newCompany.validate();

        const savedUser = await newUser.save();
        newCompany.user_id = savedUser._id;
        await newCompany.save();

        category.company_count = category.company_count + 1;
        await category.save();

        res.status(201).json({ message: "User and company created successfully" });
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error authenticating user'});
    }
}

const authenticationUser = async(req, res) =>{
    try{
        const {email, password, passwordConfirm} = req.body;

        const user = await User.findOne({email});

        if (!user){
            return res.status(404).json({message: 'User not found'});
        }

        if (password != passwordConfirm){
            return res.status(400).json({message: 'Password not confirmed'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId:user._id}, JWT_SECRET, {expiresIn: "12h"});

        res.status(200).json({ token, userId: user._id });
    }
    catch{
        res.status(500).json({message: "Error"});
    }
}

const profileUser = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({user, message: "Get user data"});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const updateUser = async(req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (req.body.name != 'undefined') user.name = req.body.name;
        if (req.body.surname != 'undefined') user.surname = req.body.surname;

        if (req.file) {
            user.avatar = {
                data: req.file.buffer.toString('base64'),
                contentType: req.file.mimetype
            };
        }

        await user.save();

        res.status(200).json({message: 'User updated successfully'})
    } catch (error){
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {createUser, authenticationUser, profileUser ,authMiddleware, createBusiness, updateUser, upload};