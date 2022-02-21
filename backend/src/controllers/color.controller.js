/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { colorService } = require('../services');

const getAllColor = catchAsync(async (req, res) => {
  const allColor = await colorService.getAllColors();
  res.send(allColor);
});

const createColor = catchAsync(async (req, res) => {
  const color = await colorService.createColor(req.body);
  res.send(color);
});

const getColorId = catchAsync(async (req, res) => {
  const color = await colorService.getColorById(req.params.id);
  if (!color) {
    throw new ApiError(httpStatus.NOT_FOUND, 'color not found');
  }
  res.send(color);
});

const updateColor = catchAsync(async (req, res) => {
  const color = await colorService.updateColorById(req.params.id, req.body);
  res.send(color);
});

const deleteColor = catchAsync(async (req, res) => {
  await colorService.deleteColorById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAllColor,
  createColor,
  getColorId,
  updateColor,
  deleteColor,
};
