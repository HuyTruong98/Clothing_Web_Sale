/* eslint-disable no-unused-vars */
const express = require('express');
const orderListCart = require('../../controllers/orderProducts.controller');

const router = express.Router();

router.post('/', orderListCart.createOrderCart);

router.get('/:id', orderListCart.getOrderId);
router.patch('/:id', orderListCart.updateOrder);
router.delete('/:id', orderListCart.deleteOrder);
router.get('/', orderListCart.getAllOrderCart);

module.exports = router;
