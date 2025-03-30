const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
        res.status(500).json({ message: "Помилка сервера" });
    }
}

module.exports = {createUser, authenticationUser, profileUser ,authMiddleware};