const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    location: {
        type: String
    },
    pdate: [String],
    balance: String
})

const UserData = mongoose.model('UserData', userSchema)

module.exports = UserData;