const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketStatusModel = new Schema({
  afterHours: {
    type: Boolean,
    required: true
  },
  currenciesCrypto: {
    type: String,
  },
  currenciesFx: {
    type: String,
  },
  earlyHours: {
    type: Boolean
  },
  exchangesStatus: {
    type: JSON,
  },
  market: {
    type: String
  },
  serverTime: {
    type: Date,
  }
});

module.exports = MarketStatus = mongoose.model("marketStatus", marketStatusModel);
