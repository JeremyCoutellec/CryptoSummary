const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockTickerSchema = new Schema({
  symbol: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  stockExchange: {
    type: String,
    required: true
  },
  stockExchangeMIC:{
    type: String,
  },
  country:{
    type: String,
  },
});

module.exports = stockTicker = mongoose.model("stockTicker", StockTickerSchema);
