const db = require('mongoose');

const userSchema = new db.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    avatar: {
        data: {type: String, default: null},
        contentType: {type: String, default:null}
    },
    email: {type: String, required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique: true},
    password: {type: String, required: true, minLength: 8},
    role: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const User = db.model('User', userSchema);
module.exports = User;