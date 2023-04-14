const express = require('express')
const Router = express.Router()
const { getUsers, getUser } = require('../controllers/UserController')
const {
  authorizeUser,
  authorizedPermissions,
  hasPermission,
} = require('../middlewares/checkAuth')

Router.route('/').get(authorizeUser, authorizedPermissions('admin'), getUsers)
Router.route('/:id').get(authorizeUser, hasPermission, getUser)

module.exports = Router
