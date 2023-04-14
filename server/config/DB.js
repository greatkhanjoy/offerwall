const mongoose = require('mongoose')

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.blue)
  } catch (err) {
    console.error('mongoDB', err)
    process.exit(1)
  }
}

module.exports = connectDB
