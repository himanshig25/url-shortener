const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRoutes = require('./routes/auth.routes')
const urlRoutes = require('./routes/url.routes')
const { redirectUrl } = require('./controllers/url.controller')

app.use('/api/auth', authRoutes)
app.use('/api/url', urlRoutes)

app.get('/:shortCode', redirectUrl)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err))


app.get('/', (req, res) => {
  res.send('URL Shortener Server is working!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server ${PORT} is live`)
})