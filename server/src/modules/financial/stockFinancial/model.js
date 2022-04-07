const mongoose = require("mongoose");
const Ticker = require('../../ticker/model');
const Financial = require('../model');
const Schema = mongoose.Schema;

const stockFinancialSchema = new Schema({
  ticker: {
    type: Ticker,
    required: true
  },
  fiscalPeriod: {
    type: String,
    required: true
  },
  fiscalYear: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  sourceFilingFileUrl: {
    type: String,
    required: true
  },
  sourceFilingUrl: {
    type: String,
    required: true
  },
  revenues: {
    type: Financial,
    required: true
  },
  balanceSheetAssets: {
    type: Financial,
    required: true
  },
  balanceSheetEquity: {
    type: Financial,
    required: true
  },
  balanceSheetLiabilities: {
    type: Financial,
    required: true
  },
  exchangeGainsLooses: {
    type: Financial,
    required: true
  },
  netCashFlow: {
    type: Financial,
    required: true
  },
  netCashFlowFromFinancingActivities: {
    type: Financial,
    required: true
  },
  comprehensiveIncomeLoss: {
    type: Financial,
    required: true
  },
  comprehensiveIncomeLossAttributeToParent: {
    type: Financial,
    required: true
  },
  otherComprehensiveIncomeLoss: {
    type: Financial,
    required: true
  },
  basicEarningsPerShare: {
    type: Financial,
    required: true
  },
  costOfRevenue: {
    type: Financial,
    required: true
  },
  grossProfit: {
    type: Financial,
    required: true
  },
  operatingExpenses: {
    type: Financial,
    required: true
  },
  revenues: {
    type: Financial,
    required: true
  },
});

module.exports = StockFinancial = mongoose.model("stockFinancial", stockFinancialSchema);
