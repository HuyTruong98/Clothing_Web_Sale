/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const CodeSales = require('../models/codeSale.model');
const ApiError = require('../utils/ApiError');

const getCountCodeSale = async (query) => {
  return CodeSales.countDocuments(query);
};

const getAllCodeSales = async (perPage, page, query) => {
  const count = await getCountCodeSale(query);
  const codesales = await CodeSales.find(query).sort({ createdAt: -1 }).skip((perPage * page) - perPage).limit(perPage);
  return { total: Math.ceil(count), data: codesales };
};

/**
 * Create a codesales
 * @param {Object} codesaleBody
 * @returns {Promise<CodeSale>}/
 */

const createCodeSale = async (codesaleBody) => {
  const codesales = new CodeSales(codesaleBody);
  await codesales.save();
  return codesales;
};

/**
 *
 * @param {*} id
 * @returns
 */

/**
 * Get codesales by id
 * @param {ObjectId} id
 * @returns {Promise<CodeSale>}
 */
const getCodeSaleById = async (id, codesales) => {
  return CodeSales.findById({ _id: id, codesales });
};

/**
 * Update codesales by id
 * @param {ObjectId} id
 * @param {Object} updateCodesale
 * @returns {Promise<CodeSale>}
 */
const updateCodeSaleById = async (id, updateBody) => {
  const codesales = await getCodeSaleById(id);
  if (!codesales) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CodeSale not found');
  }
  Object.assign(codesales, updateBody);
  await codesales.save();
  return codesales;
};

/**
 * Delete codesales by id
 * @param {ObjectId} codesaleId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (id) => {
  const codesales = await getCodeSaleById(id);
  if (!codesales) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CodeSale not found');
  }
  await codesales.remove();
  return codesales;
};

module.exports = {
  getAllCodeSales,
  createCodeSale,
  getCodeSaleById,
  updateCodeSaleById,
  deleteCategoryById,
};
