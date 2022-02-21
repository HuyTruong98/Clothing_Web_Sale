/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const Colors = require('../models/colorProduct.model');
const ApiError = require('../utils/ApiError');

const getAllColors = async () => {
  const colors = await Colors.find({}).sort({ createdAt: -1 }).populate('color');
  return colors;
};

const createColor = async (colorBody) => {
  const colors = new Colors(colorBody);
  await colors.save();
  return colors;
};

/**
 *
 * @param {*} id
 * @returns
 */

/**
 * Get color by id
 * @param {ObjectId} id
 * @returns {Promise<Colors>}
 */
const getColorById = async (id, color) => {
  return Colors.findById({ _id: id, color });
};

/**
 * Update Color by id
 * @param {ObjectId} id
 * @param {Object} updateColor
 * @returns {Promise<Color>}
 */
const updateColorById = async (id, updateBody) => {
  const colors = await getColorById(id);
  if (!colors) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
  }
  Object.assign(colors, updateBody);
  await colors.save();
  return colors;
};

/**
 * Delete color by id
 * @param {ObjectId} colorId
 * @returns {Promise<Colors>}
 */
const deleteColorById = async (id) => {
  const color = await getColorById(id);
  if (!color) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
  }
  await color.remove();
  return color;
};

module.exports = {
  getAllColors,
  createColor,
  getColorById,
  updateColorById,
  deleteColorById,
};
