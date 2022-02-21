const mongoose = require('mongoose');

const ordersProductSchema = mongoose.Schema(
  {
    code_oders: {
      type: String,
      require: true,
    },
    account_current: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: Number,
      required: true,
    },
    district: {
      type: Number,
      require: true,
    },
    ward: {
      type: String,
      require: true,
    },
    codeSale: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    methodPay: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    noteCustomer: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    transMethod: {
      type: Number,
      require: true,
    },
    priceOrder: {
      type: Number,
      require: true,
    },
    priceTransportFee: {
      type: Number,
      require: true,
    },
    oderListCart: [
      {
        _id: { type: String },
        categoryId: { type: String },
        colorProductId: { type: String },
        name: { type: String },
        price: { type: Number },
        priceSale: { type: Number },
        productCode: { type: String },
        quantily: { type: Number },
        size: { type: String },
        typeProductId: { type: String },
        imgProduct: { type: String },
      },
    ],
    current_order: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

/**
 * @typedef OrdersProduct
 */
const OrdersProduct = mongoose.model('OrdersProduct', ordersProductSchema);

module.exports = OrdersProduct;
