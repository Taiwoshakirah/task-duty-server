const express = require('express')
const { signUpUser, signin } = require('../controllers/auth')
const methodNotAllowed = require('../middlewares/methodNotAllowed.js')
const router = express.Router()

router.route('/signup').post(signUpUser).all(methodNotAllowed)
router.route('/signin').post(signin).all(methodNotAllowed)
module.exports=router