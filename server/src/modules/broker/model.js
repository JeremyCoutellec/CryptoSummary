const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brokerModel = new Schema({
  name: {
    type: String,
    required: true
  },
  tickers: {
    type: Array,
  },
  userCount: {
    type: Number,
    default: 0,
    required: true
  },
  isContract: {
    type: Boolean,
    default: false,
    required: true
  },
});

const ModelName = "Broker";
const Broker = mongoose.model(ModelName, brokerModel);

module.exports = { Model: Broker, name: ModelName };
