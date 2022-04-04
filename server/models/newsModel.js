const mongoose = require("mongoose");
const Publisher = require('./publisherModel');
const Schema = mongoose.Schema;

const newsModel = new Schema({
  tickers: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  ampUrl: {
    type: String,
    required: true
  },
  articleUrl: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
  Keywords: {
    type: Array,
    required: true
  },
  publishedUtc: {
    type: Date,
  },
  publisher: {
    type: Publisher
  }
});

module.exports = News = mongoose.model("news", newsModel);
