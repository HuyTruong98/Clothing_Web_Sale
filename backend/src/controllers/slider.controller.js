/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { slidersService } = require('../services');

const getAllSliders = catchAsync(async (req, res) => {
  const allSlider = await slidersService.getAllSliders();
  res.send(allSlider);
});

const createSliders = catchAsync(async (req, res) => {
  const result = { ...req.body, imgSlider: req.file.filename };
  const sliders = await slidersService.createSliders(result);
  // res.status(httpStatus.CREATED).send(category);
  res.send(sliders);
});

const getSliderId = catchAsync(async (req, res) => {
  const slider = await slidersService.getSliderById(req.params.id);
  if (!slider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Slider not found');
  }
  res.send(slider);
});

const updateSlider = catchAsync(async (req, res) => {
  const filter = req.params.id;
  const slider = await slidersService.getSliderById(filter);
  if (!slider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy sản phẩm');
  } else {
    const newImgSlider = { ...req.file };
    const newSlider = await slidersService.updateSliderById(slider, newImgSlider);
    res.status(httpStatus.OK).send(newSlider);
  }
});

const deleteSlider = catchAsync(async (req, res) => {
  await slidersService.deleteSliderById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAllSliders,
  createSliders,
  getSliderId,
  updateSlider,
  deleteSlider,
};
