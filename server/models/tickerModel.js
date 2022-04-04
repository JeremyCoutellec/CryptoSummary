const mongoose = require("mongoose");
const Address = require('./addressModel');
const TickerType = require('./tickerTypeModel');
const MarketEnum = require('./marketEnum');
const LocaleEnum = require('./localeEnum');
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
    required: true
  },
  address:{
    type: Address,
  },
  type:{
    type: TickerType,
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

module.exports = Ticker = mongoose.model("ticker", tickerSchema);
