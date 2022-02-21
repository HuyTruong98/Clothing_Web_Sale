const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema(
  {
    imgSlider: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Sliders
 */
const Sliders = mongoose.model('Sliders', sliderSchema);

module.exports = Sliders;
