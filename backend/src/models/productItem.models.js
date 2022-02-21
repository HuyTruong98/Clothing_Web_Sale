const mongoose = require('mongoose');

const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Categories',
      required: true,
    },
    typeProductId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'typeProduct',
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    priceSale: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },

    imgProduct: [
      {
        id: { type: String },
        imgUrl: { type: String },
      },
    ],

    sizeAndColorAndNumber: [
      {
        size: { type: String },
        colorProductId: {
          type: mongoose.Schema.ObjectId,
          ref: 'colorProduct',
        },
        howNumber: { type: Number },
      },
    ],
    dealHot: {
      type: String,
      require: true,
    },
    bestSeller: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

/**
 * @typedef Products
 */
const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
