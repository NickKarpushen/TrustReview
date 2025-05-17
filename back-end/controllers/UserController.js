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

const validatePassword = (password) => {

    if (!password || password.length == 0) {
        return 'Password is required';
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    if (/\s/.test(password)) {
        return 'Password must not contain spaces';
    }

    if (!/[a-zA-Z]/.test(password)) {
        return 'Password must contain at least one letter';
    }

    return null;
};

const validateDataUser = (dataName, data) => {

    if (!data || data.trim() === '') {
        return `${dataName} is required`;
    }

    if (/\s/.test(data)) {
        return `${dataName} must not contain spaces`;
    }

    return null

};

const createUser = async(req, res) => {
    try {
        const { name, surname, email, password, passwordConfirm, role } = req.body;
        
        const emailError = validateDataUser("Email", email);
        if (emailError) {
            return res.status(400).json({ message: emailError });
        }

        const nameError = validateDataUser("Name", name);
        if (nameError) {
            return res.status(400).json({ message: nameError });
        }

        const surnameError = validateDataUser("Surname", surname);
        if (surnameError) {
            return res.status(400).json({ message: surnameError });
        }

        const user = await User.findOne({email});
        
        if (user){
            return res.status(400).json({message: 'User already exists'});
        }

        if (password != passwordConfirm){
            return res.status(400).json({message: 'Password not confirmed'})
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
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

        const emailError = validateDataUser("Email", email);
        if (emailError) {
            return res.status(400).json({ message: emailError });
        }

        const nameError = validateDataUser("Name", name);
        if (nameError) {
            return res.status(400).json({ message: nameError });
        }

        const surnameError = validateDataUser("Surname", surname);
        if (surnameError) {
            return res.status(400).json({ message: surnameError });
        }

        const emailWorkError = validateDataUser("Work email", work_email);
        if (emailWorkError) {
            return res.status(400).json({ message: emailWorkError });
        }

        const companyNameError = validateDataUser("Company name", company_name);
        if (companyNameError) {
            return res.status(400).json({ message: companyNameError });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ message: 'Password not confirmed' });
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
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
        const { userId, name, surname } = req.body;

        const nameError = validateDataUser("Name", name);
        if (nameError) {
            return res.status(400).json({ message: nameError });
        }

        const surnameError = validateDataUser("Surname", surname);
        if (surnameError) {
            return res.status(400).json({ message: surnameError });
        }

        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name != 'undefined') user.name = name;
        if (surname != 'undefined') user.surname = surname;

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