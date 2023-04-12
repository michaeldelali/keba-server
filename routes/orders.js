var express = require('express');
var router = express.Router();

var order = require('../controllers/ordersController');

router.post('/', order.getAllOrders);
router.post('/getOder', order.getOrder);
router.post('/getRestaurantOrders', order.getRestaurantOrders);
router.post('/getBranchOrders', order.getBranchOrders);
router.post('/getTableOrders', order.getTableOrders);
router.post('/getBranchOrdersByStatus', order.getBranchOrdersByStatus);
router.post('/getTableOrdersByStatus', order.getTableOrdersByStatus);
router.post('/getBranchOrdersByDate', order.getBranchOrdersByDate);
router.post('/getTableOrdersByDate', order.getTableOrdersByDate);
router.post('/getBranchOrdersByDateAndStatus', order.getBranchOrdersByDateAndStatus);
router.post('/getTableOrdersByDateAndStatus', order.getTableOrdersByDateAndStatus);

router.post('/createOrder', order.createOrder);
router.put('/updateOrder', order.updateOrder);
router.delete('/deleteOrder', order.deleteOrder);



module.exports = router;