/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { codesaleService } = require('../services');
const CodeSale = require('../models/codeSale.model');
const pick = require('../utils/pick');

const getAllCodeSales = catchAsync(async (req, res) => {
  let perPage = req.query.limit || 4;
  let page = req.query.page || 1;
  let filter = pick(req.query, ['code']);
  let query = {};

  if (filter.code) {
    query.code = { $regex: filter.code, $options: 'i' };
  }
  const allCodesales = await codesaleService.getAllCodeSales(perPage, page, query);
  res.send(allCodesales);
});

const createCodeSale = catchAsync(async (req, res) => {
  const codesale = await codesaleService.createCodeSale(req.body);
  // res.status(httpStatus.CREATED).send(category);
  res.send(codesale);
});

const getCodeSaleId = catchAsync(async (req, res) => {
  const codesale = await codesaleService.getCodeSaleById(req.params.id);
  if (!codesale) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CodeSale not found');
  }
  res.send(codesale);
});

const updateCodeSale = catchAsync(async (req, res) => {
  const codesale = await codesaleService.updateCodeSaleById(req.params.id, req.body);
  res.send(codesale);
});

const deleteCodeSale = catchAsync(async (req, res) => {
  await codesaleService.deleteCategoryById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAllCodeSales,
  createCodeSale,
  getCodeSaleId,
  updateCodeSale,
  deleteCodeSale,
};
