const express = require('express')
const Router = express.Router()
const {
  registerUser,
  loginUser,
  test,
} = require('../controllers/AuthController')
const {
  authorizeUser,
  authorizedPermissions,
} = require('../middlewares/checkAuth')

Router.route('/register').post(registerUser)
Router.route('/').post(loginUser)
Router.route('/test').get(
  authorizeUser,
  authorizedPermissions('admin', 'user'),
  test
)

module.exports = Router
