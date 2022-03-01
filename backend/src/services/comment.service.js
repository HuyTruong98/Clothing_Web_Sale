/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const Comment = require('../models/comment.model');
const ApiError = require('../utils/ApiError');

const getAllComment = async () => {
  const comments = await Comment.find({}).sort({ createdAt: -1 }).populate('comments');
  return comments;
};
/**
 * Create a comment
 * @param {Object} commentBody
 * @returns {Promise<commentBody>}/
 */

const createComment = async (commentBody) => {
  const comment = new Comment(commentBody);
  await comment.save();
  return comment;
};

module.exports = {
  getAllComment,
  createComment,
};
