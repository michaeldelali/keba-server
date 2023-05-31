const router = require('express').Router();
const branch = require('../controllers/branchController') 
const uploadMiddleware = require('../middleware/upload');

router.get('/', branch.getAllBranch);
router.get('/getBranch', branch.getBranch);
router.post('/addBranch',uploadMiddleware, branch.addBranch);
router.put('/updateBranch', branch.updateBranch);
router.delete('/deleteBranch', branch.deleteBranch);
router.post('/getBranchByRestaurantId', branch.getBranchByRestaurantId);

module.exports = router;