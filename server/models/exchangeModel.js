const mongoose = require("mongoose");
const AssetClassEnum = require("./assetClassEnum");
const LocaleEnum = require("./localeEnum");
const ExchangeTypeEnum = require("./exchangeTypeEnum");
const Schema = mongoose.Schema;

const exchangeModel = new Schema({
  acronym: {
    type: String,
    required: true
  },
  assetClass: {
    type: AssetClassEnum,
  },
  id: {
    type: String,
    required: true
  },
  locale: {
    type: LocaleEnum
  },
  mic: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  operatingMic: {
    type: String,
  },
  participantId: {
    type: String,
  },
  type: {
    type: ExchangeTypeEnum,
  },
  url: {
    type: String,
  }
});

module.exports = Exchange = mongoose.model("exchange", exchangeModel);
