const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    accountId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product',
      required: true,
    },
    account_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

/**
 * @typedef Comments
 */
const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
