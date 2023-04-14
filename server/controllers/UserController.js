const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc    Register a user
// @route   POST /api/v1/auth/user
// @access  Private

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, username } = req.body

  // Create user
  const user = await User.create({ ...req.body })

  res.status(201).json({
    message: 'success',
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
    },
  })
})

// @desc    Get all users
// @route   GET /api/v1/auth/user
// @access  Private

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password')

  res.status(200).json({
    message: 'success',
    users,
  })
})

// @desc    Get a user
// @route   GET /api/v1/auth/user/:id
// @access  Private

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    throw new Error('User not found')
  }

  res.status(200).json({
    message: 'success',
    user,
  })
})

// @desc    Update a user
// @route   PUT /api/v1/auth/user/:id
// @access  Private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    throw new Error('User not found')
  }

  const { name, email, role, username, ...rest } = req.body

  user.name = name
  user.email = email
  user.role = role
  user.username = username

  await user.save()

  res.status(200).json({
    message: 'success',
  })
})

// @desc    Delete a user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    throw new Error('User not found')
  }

  await user.remove()

  res.status(200).json({
    message: 'success',
  })
})
