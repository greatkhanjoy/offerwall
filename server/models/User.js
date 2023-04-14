const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
      maxLength: [30, 'Your name cannot exceed 30 characters'],
      minLength: [3, 'Your name cannot be less than 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Please enter your username'],
      trim: true,
      unique: true,
      maxLength: [15, 'Your username cannot exceed 15 characters'],
      minLength: [3, 'Your username cannot be less than 3 characters'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      trim: true,
      minLength: [6, 'Your password cannot be less than 6 characters'],
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'owner'],
    },
    balance: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    mobile: {
      type: String,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive', 'suspended'],
    },
  },
  { timestamps: true }
)

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, status: this.status },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    }
  )
}

module.exports = mongoose.model('User', userSchema)
