const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const ErrorHandler = require('../middlewares/errorHandler')
const { generateFromEmail } = require('unique-username-generator')

// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  Public

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, ...rest } = req.body

  if (!name || !email || !password) {
    throw new ErrorHandler('Please enter required fields', 400)
  }

  let username = generateFromEmail(email, 3)

  //check if username already exists in database
  const checkUsername = await User.find({ username })

  if (checkUsername.length > 0) {
    username = generateFromEmail(email, 3)
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    username,
    ...rest,
  })

  const token = await user.getJwtToken()

  res.status(201).json({
    message: 'success',
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
    },
  })
})

// @desc    Login user
// @route   POST /api/v1/auth
// @access  Public

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // Validate email & password
  if (!email || !password) {
    throw new Error('Please enter email & password', 400)
  }

  // Check for user
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Invalid email or password', 401)
  }

  // Check if password matches
  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    throw new Error('Invalid email or password', 401)
  }

  const token = await user.getJwtToken()

  res.status(200).json({
    message: 'success',
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
    },
  })
})

exports.test = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: 'success',
    data: {
      user: req.user,
    },
  })
})
