const mongoose = require("mongoose");
const AssetClassEnum = require('../../../core/commonEnum/assetClassEnum');
const LocaleEnum = require('../../../core/commonEnum/localeEnum');
const Schema = mongoose.Schema;

const tickerTypeSchema = new Schema({
  assetClass: {
    type: AssetClassEnum,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
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

const ModelName = "TickerType";
const TickerType = mongoose.model(ModelName, tickerTypeSchema);

module.exports = { Model: TickerType, name: ModelName };
