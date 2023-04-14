const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    revenue: {
      type: Number,
      default: 0,
    },
    reward: {
      type: Number,
      default: 0,
    },
    method: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'success', 'rejected', 'failed'],
    },
    paymentId: {
      type: String,
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Transaction', transactionSchema)
