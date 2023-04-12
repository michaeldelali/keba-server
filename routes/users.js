var express = require('express');
var router = express.Router();

var user = require('../controllers/usersControllers');

router.get('/', user.getAllUsers);
router.get('/user', user.getUser);
router.get('/restaurant', user.getRestaurantUsers);
router.get('/branch', user.getBranchUsers);
router.delete('/delete', user.deleteUser);
router.post('/create', user.createUser);
router.put('/update', user.updateUser);


module.exports = router;