const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financialSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  xpath: {
    type: String,
  },
  formula: {
    type: String,
  },
});

const ModelName = "Financial";
const Financial = mongoose.model(ModelName, financialSchema);

module.exports = { Model: Financial, name: ModelName };
