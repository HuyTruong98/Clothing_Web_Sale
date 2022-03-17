const express = require('express');
const commentController = require('../../controllers/comment.controller');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');

const router = express.Router();

router.post('/', commentController.createComment);

router.get('/:id', commentController.getCommentId);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
router.get('/', validate(commentValidation.getAllComments), commentController.getAllComments);

module.exports = router;
