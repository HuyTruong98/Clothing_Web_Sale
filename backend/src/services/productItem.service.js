/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
const httpStatus = require('http-status');
const { number } = require('joi');
const { restart } = require('pm2');
// eslint-disable-next-line no-unused-vars
const { Console } = require('winston/lib/winston/transports');
const Products = require('../models/productItem.models');
const ApiError = require('../utils/ApiError');

const getCountProduct = async (query) => {
  return Products.countDocuments(query);
};

const getAllProducts = async (perPage, page, query, createdAt, price) => {
  const sortProduct = price.price ? price : createdAt;
  const count = await getCountProduct(query);
  const products = await Products.find(query).sort(sortProduct).skip((perPage * page) - perPage).limit(perPage);
  return { total: Math.ceil(count), data: products };
};

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promisze<Product>}/
 */

const createProduct = async (productBody) => {
  function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  var productCodeAuto = makeid(4);
  const num = await Products.countDocuments({});
  var productCodeAuto = productCodeAuto + (num + 1);
  const product = new Products(productBody);
  product.productCode = productCodeAuto;
  const imgChange4 = Array(4).fill('');
  const imgChange5 = Array(5).fill('');
  if (product.imgProduct.length === 1) {
    imgChange4.map((item) => {
      const newObj = {
        imgUrl: item
      };
      product.imgProduct.push(newObj);
    });
  } else if (product.imgProduct.length === 0) {
    imgChange5.map((item) => {
      const newObj = {
        imgUrl: item
      };
      product.imgProduct.push(newObj);
    });
  }
  await product.save();
  return product;
};

/**
 *
 * @param {*} id
 * @returns
 */

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id, product) => {
  return Products.findById({ _id: id, product });
};

/**
 * Update product by id
 * @param {ObjectId} id
 * @param {Object} updateProduct
 * @returns {Promise<Product>}
 */
const updateProductById = async (id, updateBody, changeImage, imgProduct) => {
  var result = { ...updateBody };
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  } else if (result.dealHot === '') {
    const newResult = { ...result, dealHot: '', bestSeller: result.bestSeller }
    Object.assign(product, newResult);
    await product.save();
    return product;
  } else {
    Object.assign(product, result);
    await product.save();
    return product;
  }
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProducts,
};
