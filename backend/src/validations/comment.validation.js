const Joi = require('joi');

const getAllComments = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
    productId: Joi.string(),
  }),
};

module.exports = {
  getAllComments,
};
