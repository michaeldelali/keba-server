const router = require('express').Router();
const {getTokenHandler,verifyToken} = require('../controllers/tokenController')

router.route('/')
.get(getTokenHandler)
.post(verifyToken)



module.exports = router;