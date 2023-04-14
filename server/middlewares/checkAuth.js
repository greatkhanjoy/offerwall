const asyncHandler = require('express-async-handler')
const { VerifyJWT } = require('../utils/verifyJWT')
const User = require('../models/User')

//Check if user is logged in
const authorizeUser = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized', 401)
    }
    const token = req.headers.authorization.split(' ')[1]
    const payload = await VerifyJWT(token)
    if (!payload) {
      throw new Error('Invalid Token', 401)
    }
    req.user = payload
    next()
  } else if (req.signedCookies.token) {
    const payload = await VerifyJWT(req.signedCookies.token)
    if (!payload) {
      return res.status(401).json({ message: 'Invalid Token' })
    }
    req.user = payload
    next()
  } else {
    throw new Error('Unauthorized', 401)
    next()
  }
})

//Check if user is admin
const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new Error('Unauthorized', 401)
  }
  next()
})

//Check if user has permission to access the route
const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error('Unauthorized', 401)
    }
    next()
  }
}

const hasPermission = asyncHandler(async (req, res, next) => {
  const requestedUser = req.params.id
  if (req.user.role !== 'admin' || req.user._id !== requestedUser) {
    throw new Error('Unauthorized', 401)
  }
  next()
})

module.exports = {
  authorizeUser,
  isAdmin,
  authorizedPermissions,
  hasPermission,
}
