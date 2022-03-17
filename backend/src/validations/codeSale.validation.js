const Joi = require('joi');

const getAllCodeSales = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
    code: Joi.string(),
  }),
};

module.exports = {
  getAllCodeSales,
};
