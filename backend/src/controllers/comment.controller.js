/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');
const pick = require('../utils/pick');

const getAllComments = catchAsync(async (req, res) => {
  let perPage = req.query.limit || 4;
  let page = req.query.page || 1;
  let filter = pick(req.query, ['productId']);
  let query = {};
  if (filter.productId) {
    query.productId = filter.productId || {};
  }

  const allComments = await commentService.getAllComment(perPage, page, query);
  res.send(allComments);
});

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  res.send(comment);
});

const getCommentId = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.id);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  res.send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.params.id, req.body);
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAllComments,
  createComment,
  getCommentId,
  updateComment,
  deleteComment,
};
