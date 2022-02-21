/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const Sliders = require('../models/slider.models');
const ApiError = require('../utils/ApiError');

const getAllSliders = async () => {
  const sliders = await Sliders.find({}).sort({ createdAt: -1 }).populate('slider');
  return sliders;
};

const createSliders = async (slidersBody) => {
  const sliders = new Sliders(slidersBody);
  await sliders.save();
  return sliders;
};

/**
 *
 * @param {*} id
 * @returns
 */

/**
 * Get slider by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getSliderById = async (id, slider) => {
  return Sliders.findById({ _id: id, slider });
};

/**
 * Update slider by id
 * @param {ObjectId} id
 * @param {Object} updateSlider
 * @returns {Promise<Category>}
 */
const updateSliderById = async (slider, newImgSlider) => {
  const newObj = {};
  if (JSON.stringify(newImgSlider) === JSON.stringify(newObj)) {
    Object.assign(slider, slider);
    await slider.save();
    return slider;
  } else {
    slider.imgSlider = newImgSlider.filename;
    Object.assign(slider, slider);
    await slider.save();
    return slider;
  }

  // if (!slider) {
  //   console.log('abc');
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Slider not found');
  // } else {
  //   console.log('serviceFilter', newImgSlider);
  //   console.log('serviceSlider', slider);
  // }
  // else if (newImgSlider) {
  //   slider.imgSlider = newImgSlider.filename;
  //   Object.assign(oldSlider, slider);
  //   await oldSlider.save();
  //   return oldSlider;
  // } else {
  //   Object.assign(oldSlider, slider);
  //   await oldSlider.save();
  //   return oldSlider;
  // }
};

/**
 * Delete slider by id
 * @param {ObjectId} sliderId
 * @returns {Promise<Category>}
 */
const deleteSliderById = async (id) => {
  const slider = await getSliderById(id);
  if (!slider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Slider not found');
  }
  await slider.remove();
  return slider;
};

module.exports = {
  getAllSliders,
  createSliders,
  getSliderById,
  updateSliderById,
  deleteSliderById,
};
