const mongoose = require("mongoose");
const AssetClassEnum = require("../../core/commonEnum/assetClassEnum");
const LocaleEnum = require("../../core/commonEnum/localeEnum");
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

const ModelName = "Exchange";
const Exchange = mongoose.model(ModelName, exchangeModel);

module.exports = { Model: Exchange, name: ModelName };
