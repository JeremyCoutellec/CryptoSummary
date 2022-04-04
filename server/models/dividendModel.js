const mongoose = require("mongoose");
const Ticker = require('./tickerModel');
const DividendTypeEnum = require('./dividendTypeEnum');
const Schema = mongoose.Schema;

const dividendSchema = new Schema({
  ticker: {
    type: Ticker,
    required: true
  },
  cashAmount: {
    type: Number,
    required: true
  },
  declarationDate: {
    type: Date,
    required: true
  },
  dividendType: {
    type: DividendTypeEnum,
    required: true
  },
  exDividendDate: {
    type: Date,
  },
  frequency: {
    type: Number,
  },
  payDate: {
    type: Date,
  },
  recordDate: {
    type: Date,
  }
});

module.exports = Dividend = mongoose.model("dividend", dividendSchema);
