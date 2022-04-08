const mongoose = require("mongoose");
const MarketEnum = require('../market/marketEnum');
const LocaleEnum = require('../../core/commonEnum/localeEnum');
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  active: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  address:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  type:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TickerType',
  },
  brandingIcon:{
    type: String
  },
  brandingLogo:{
    type: String
  },
  cik:{
    type: String
  },
  compositeFigi:{
    type: String
  },
  currencyName:{
    type: String
  },
  description:{
    type: String
  },
  listDate:{
    type: String
  },
  homepageUrl:{
    type: String
  },
  locale:{
    type: LocaleEnum
  },
  market:{
    type: MarketEnum
  },
  marketCap:{
    type: Number
  },
  phoneNumber:{
    type: String
  },
  primaryExchange:{
    type: String
  },
  shareClassFigi:{
    type: String
  },
  shareClassSharesOutstanding:{
    type: String
  },
  sicCode:{
    type: String
  },
  sicDescription:{
    type: String
  },
  totalEmployees:{
    type: Number
  },
  weightedSharesOutstanding:{
    type: Number
  }
});

const ModelName = "Ticker";
const Ticker = mongoose.model(ModelName, tickerSchema);

module.exports = { Model: Ticker, name: ModelName };
