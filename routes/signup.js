const router = require('express').Router();
const signupController = require('../controllers/signupController')

router.route('/')
.post(signupController.handleSignup)


module.exports = router;