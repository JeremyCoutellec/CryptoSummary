const mongoose = require("mongoose");
const Ticker = require('../../ticker/model');
const Schema = mongoose.Schema;

const transactionModel = new Schema({
  ticker: {
    type: Ticker,
    required: true
  },
  closest: {
    type: Number,
    required: true
  },
  highest: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  openPrice: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  volumeWeighted: {
    type: Number,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  }
});

module.exports = Transaction = mongoose.model("transaction", transactionModel);
