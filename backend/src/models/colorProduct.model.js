const mongoose = require('mongoose');

const colorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Colors
 */
const Colors = mongoose.model('Colors', colorSchema);

module.exports = Colors;
