/* eslint-disable no-unused-vars */
const express = require('express');
const slidersController = require('../../controllers/slider.controller');
const { uploadSingleFile } = require('../../middlewares/uploadfile');

const router = express.Router();
router.post('/', uploadSingleFile, slidersController.createSliders);

router.get('/:id', slidersController.getSliderId);
router.patch('/:id', uploadSingleFile, slidersController.updateSlider);
router.delete('/:id', slidersController.deleteSlider);
router.get('/', slidersController.getAllSliders);

module.exports = router;
