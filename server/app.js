const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const DB = require('./config/DB')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')
const AuthRoutes = require('./routes/AuthRoutes')
const UserRoutes = require('./routes/UserRoutes')

//Initialize
const app = express()
dotenv.config()

//define variables
let port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload({ useTempFiles: true }))

// Routes
app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/user', UserRoutes)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome!' })
})

// Middleware
app.use(errorHandler)
app.use(notFound)

// Start Server
const start = async () => {
  try {
    await DB()
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`.green)
    })
  } catch (e) {
    console.log(e.red)
  }
}

start()
