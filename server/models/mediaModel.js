const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    contentUrl: {
        type: String,
        required: true
    }
});

module.exports = Media = mongoose.model("media", mediaSchema);
