const mongoose = require("mongoose");
const AssetClassEnum = require('./assetClassEnum');
const LocaleEnum = require('./localeEnum');
const Schema = mongoose.Schema;

const tickerTypeSchema = new Schema({
  assetClass: {
    type: AssetClassEnum,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  locale: {
    type: LocaleEnum,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = TickerType = mongoose.model("tickerType", tickerTypeSchema);
