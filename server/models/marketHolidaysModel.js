const mongoose = require("mongoose");
const Exchange = require('./exchangeModel');
const Schema = mongoose.Schema;

const marketHolidaysModel = new Schema({
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  exchange: {
    type: Exchange
  }
});

module.exports = MarketHolidays = mongoose.model("marketHolidays", marketHolidaysModel);
