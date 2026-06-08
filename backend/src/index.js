const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
// Middleware
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connect ho gaya!'))
  .catch((err) => console.log('MongoDB error:', err))
app.get('/', (req, res) => {
  res.send('URL Shortener Server is working!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server ${PORT} pe chal raha hai`)
})
