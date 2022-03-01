/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const getAllComments = catchAsync(async (req, res) => {
  const allComments = await commentService.getAllComment();
  res.send(allComments);
});

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  res.send(comment);
});

module.exports = {
  getAllComments,
  createComment,
};
