var express = require('express');
var router = express.Router();

var table = require('../controllers/tableController');

// router.get('/', table.getAllTables);
router.post('/getAllBranchTables', table.getAllBranchTables);
router.get('/getTable', table.getTable);

router.post('/create', table.addTable);
router.put('/update', table.updateTable);
router.delete('/delete', table.deleteTable);

module.exports = router;