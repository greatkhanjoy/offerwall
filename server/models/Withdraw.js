const mongoose = require('mongoose')
const Schema = mongoose.Schema

const withdrawSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: [true, 'Please enter the amount'],
    },
    method: {
      type: String,
      required: [true, 'Please enter the method'],
      enum: ['cash', 'bkash', 'rocket', 'nagad', 'bank'],
      default: 'cash',
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'success', 'rejected', 'failed'],
    },
    paymentInfo: {
      type: String,
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Withdraw', withdrawSchema)
