/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const pick = require('../utils/pick');
const Products = require('../models/productItem.models');

const getAllProduct = catchAsync(async (req, res) => {
  const count = Products.countDocuments;
  let perPage = req.query.limit || count;
  let page = req.query.page || 1;
  let filter = pick(req.query, ['categoryId', 'typeProductId', 'name', 'dealHot']);
  let query = {};

  if (filter.categoryId) {
    query.categoryId = filter.categoryId || {};
  }

  if (filter.categoryId && filter.typeProductId) {
    query.typeProductId = filter.typeProductId;
  }

  if (filter.name) {
    query.name = { $regex: filter.name, $options: 'i' };
  }

  if (filter.dealHot) {
    query.dealHot = { $regex: filter.dealHot, $options: 'i' };
  }

  const allProduct = await productService.getAllProducts(perPage, page, query);
  res.send(allProduct);
});

const createProduct = catchAsync(async (req, res) => {
  const productImg = [];
  req.files.forEach((item) => {
    const newObj = {
      imgUrl: item.filename,
    };
    productImg.push(newObj);
  });
  const newDeal = '';
  const result = { ...req.body, imgProduct: productImg, dealHot: newDeal };
  const product = await productService.createProduct(result);
  res.send(product);
});

const getProductId = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const filter = req.params.id;
  const product = await productService.getProductById(filter);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy sản phẩm');
  } else {
    const productImg = [...product.imgProduct];
    const changeImage = [];
    req.files.forEach((item) => changeImage.push(item.filename));
    const result = { ...req.body };
    const newProduct = await productService.updateProductById(filter, result, productImg, changeImage);
    res.status(httpStatus.OK).send(newProduct);
  }
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProductId,
  updateProduct,
  deleteProduct,
  getAllProduct,
};
