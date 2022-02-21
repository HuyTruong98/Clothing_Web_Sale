const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    categoryId: Joi.string(),
    typeProductId: Joi.string(),
    price: Joi.number().precision(2).required(),
    priceSale: Joi.number(),
    description: Joi.string().required(),
    imgProduct: Joi.any(),
    sizeAndColorAndNumber: Joi.any(),
    bestSeller: Joi.any(),
  }),
};

const getAllProduct = {
  query: Joi.object().keys({
    name: Joi.string(),
    productCode: Joi.string(),
    categoryId: Joi.string(),
    typeProductId: Joi.string(),
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
    dealHot: Joi.any(),
    bestSeller: Joi.string(),
  }),
};

const getProductId = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      _id: Joi.string(),
      name: Joi.string().min(3).max(30),
      productCode: Joi.string().min(3).max(30),
      categoryId: Joi.string(),
      typeProductId: Joi.string(),
      price: Joi.number().precision(2),
      priceSale: Joi.number(),
      description: Joi.string(),
      imgProduct: Joi.any(),
      imgUrl: Joi.any(),
      sizeAndColorAndNumber: Joi.any(),
      dealHot: Joi.any(),
      bestSeller: Joi.any(),
      form_data: Joi.any(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductId,
  getAllProduct,
};
