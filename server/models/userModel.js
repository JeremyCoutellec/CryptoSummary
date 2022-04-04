const mongoose = require("mongoose");
const Media = require('./mediaModel');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatar: {
        type: Media
    },
    favoriteTicker: {
        type: Array
    }
});

module.exports = User = mongoose.model("user", userSchema);
