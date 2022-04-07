const mongoose = require("mongoose");
const Exchange = require('../../exchange/model');
const Schema = mongoose.Schema;

const marketHolidayModel = new Schema({
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

const ModelName = "MarketHoliday";
const MarketHoliday = mongoose.model(ModelName, marketHolidayModel);

module.exports = { Model: MarketHoliday, name: ModelName };
