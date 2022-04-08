const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address1: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address2: {
        type: String
    }
});

const ModelName = "Address";
const Address = mongoose.model(ModelName, addressSchema);

module.exports = { Model: Address, name: ModelName };
