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

const ModelName = "Media";
const Media = mongoose.model(ModelName, mediaSchema);

module.exports = { Model: Media, name: ModelName };
