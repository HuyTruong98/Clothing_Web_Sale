/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Console } = require('winston/lib/winston/transports');
const Comments = require('../models/comment.model');
const ApiError = require('../utils/ApiError');

const getCountComment = async (query) => {
  return Comments.countDocuments(query);
};

const getAllComment = async (perPage, page, query) => {
  const count = await getCountComment(query);
  const comments = await Comments.find(query).sort({ createdAt: -1 }).skip((perPage * page) - perPage).limit(perPage);
  return { total: Math.ceil(count), data: comments };
};
/**
 * Create a comment
 * @param {Object} commentBody
 * @returns {Promise<commentBody>}/
 */

const createComment = async (commentBody) => {
  const comment = new Comments(commentBody);
  await comment.save();
  return comment;
};

/**
 *
 * @param {*} id
 * @returns
 */

/**
 * Get comment by id
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id, comment) => {
  return Comments.findById({ _id: id, comment });
};

/**
 * Update comment by id
 * @param {ObjectId} id
 * @param {Object} updateComment
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (id, updateBody) => {
  const comment = await getCommentById(id);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

/**
 * Delete comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (id) => {
  const comment = await getCommentById(id);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await comment.remove();
  return comment;
};

module.exports = {
  getAllComment,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
