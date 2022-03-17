/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const OrdersProduct = require('../models/orderProducts.models');
const ApiError = require('../utils/ApiError');

const getCountOrder = async (query) => {
  return OrdersProduct.countDocuments(query);
};

const getAllOrders = async (perPage, page, query) => {
  const count = await getCountOrder(query);
  // const orders = await OrdersProduct.find(query).sort({ createdAt: -1 }).skip((perPage * page) - perPage).limit(perPage);
  const orders = await OrdersProduct.find({}).sort({ createdAt: -1 }).populate('order');
  return { total: Math.ceil(count), data: orders };
};

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}/
 */

const createOder = async (orderBody) => {
  function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  var codeOrderAuto = makeid(4);
  const num = await OrdersProduct.countDocuments({});
  var codeOrderAuto = `MĐH` + codeOrderAuto + (num + 1);
  const order = new OrdersProduct(orderBody);
  order.code_oders = codeOrderAuto;
  await order.save();
  return order;
};

/**
 *
 * @param {*} id
 * @returns
 */

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */

const getOrderById = async (id, order) => {
  return OrdersProduct.findById({ _id: id, order });
};

/**
 * Update category by id
 * @param {ObjectId} id
 * @param {Object} updateCategory
 * @returns {Promise<Category>}
 */
const updateOrderById = async (id, updateBody) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteOrderById = async (id) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

module.exports = {
  getAllOrders,
  createOder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
