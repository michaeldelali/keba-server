var express = require('express');
var router = express.Router();

var menu = require('../controllers/menuController');
const path = require('path');
const uploadMiddleware = require('../middleware/upload');


router.get('/',menu.getAllMenu);
router.get('/getMenu', menu.getMenu);
router.post('/addMenu',uploadMiddleware, menu.addMenu);
router.put('/updateMenu', menu.updateMenu);
router.delete('/deleteMenu', menu.deleteMenu);


module.exports = router;