var express = require('express');
var router = express.Router();

var customer = require('../controllers/customerController');

router.post('/viewBranchMenuByView', customer.viewBranchMenuByView);
router.post('/viewBranchInfo', customer.viewBranchInfo);
router.post('/createOrder', customer.createOrder);
router.post('/generateOrderId', customer.generateOrderId);

module.exports = router;