/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');
const pick = require('../utils/pick');
const OrdersProduct = require('../models/orderProducts.models');

const getAllOrderCart = catchAsync(async (req, res) => {
  const allOderCart = await orderService.getAllOrders();
  res.send(allOderCart);
});

const createOrderCart = catchAsync(async (req, res) => {
  const createOder = await orderService.createOder(req.body);
  res.status(httpStatus.CREATED).send(createOder);
});

const getOrderId = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.id, req.body);
  res.send(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAllOrderCart,
  createOrderCart,
  getOrderId,
  updateOrder,
  deleteOrder,
};
