const express = require('express');
const colorController = require('../../controllers/color.controller');

const router = express.Router();

router.post('/', colorController.createColor);

router.get('/:id', colorController.getColorId);
router.patch('/:id', colorController.updateColor);
router.delete('/:id', colorController.deleteColor);
router.get('/', colorController.getAllColor);

module.exports = router;
