const mongoose = require('mongoose');
// const { tokenTypes } = require('../config/tokens');

const codeSaleSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantily: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

/**
 * @typedef CodeSale
 */
const CodeSale = mongoose.model('CodeSale', codeSaleSchema);

module.exports = CodeSale;
