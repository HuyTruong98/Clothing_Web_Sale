const express = require('express');
const codesaleController = require('../../controllers/codeSale.controller');
const validate = require('../../middlewares/validate');
const codeSaleValidation = require('../../validations/codeSale.validation');

const router = express.Router();

router.post('/', codesaleController.createCodeSale);

router.get('/:id', codesaleController.getCodeSaleId);
router.patch('/:id', codesaleController.updateCodeSale);
router.delete('/:id', codesaleController.deleteCodeSale);
router.get('/', validate(codeSaleValidation.getAllCodeSales), codesaleController.getAllCodeSales);

module.exports = router;
