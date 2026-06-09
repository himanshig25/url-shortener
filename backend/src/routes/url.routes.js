const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { createShortUrl, getAnalytics } = require('../controllers/url.controller')

router.post('/shorten', authMiddleware, createShortUrl)
router.get('/analytics', authMiddleware, getAnalytics)

module.exports = router