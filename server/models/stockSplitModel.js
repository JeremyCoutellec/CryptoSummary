const mongoose = require("mongoose");
const Ticker = require('./tickerModel');
const Schema = mongoose.Schema;

const stockSplitSchema = new Schema({
  ticker: {
    type: Ticker,
    required: true
  },
  executionDate: {
    type: Date,
    required: true
  },
  splitTo: {
    type: Number,
    required: true
  },
  splitFrom: {
    type: Number,
    required: true
  }
});

module.exports = StockSplit = mongoose.model("stockSplit", stockSplitSchema);
