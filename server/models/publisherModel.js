const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publisherModel = new Schema({
  name: {
    type: String,
    required: true
  },
  faviconUrl: {
    type: String
  },
  homepageUrl: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String
  }
});

module.exports = Publisher = mongoose.model("publisher", publisherModel);
