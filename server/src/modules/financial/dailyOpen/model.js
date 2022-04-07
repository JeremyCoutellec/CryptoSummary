const mongoose = require("mongoose");
const Ticker = require('../../ticker/model');
const Schema = mongoose.Schema;

const dailyOpenModel = new Schema({
  ticker: {
    type: Ticker,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  open: {
    type: Number,
    required: true
  },
  preMarket: {
    type: Date,
    required: true
  },
  volume: {
    type: Number,
    required: true
  }
});

module.exports = DailyOpen = mongoose.model("dailyOpen", dailyOpenModel);
