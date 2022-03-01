const express = require('express');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

router.post('/', commentController.createComment);

router.get('/', commentController.getAllComments);

module.exports = router;
