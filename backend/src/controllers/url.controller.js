const Url = require('../models/url.model')
const { nanoid } = require('nanoid')

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body

    const shortCode = nanoid(6)

    const url = await Url.create({
      originalUrl,
      shortCode,
      user: req.userId
    })

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      shortCode,
      originalUrl
    })

  } catch (error) {
    console.log('URL create error:', error.message)
    res.status(500).json({ message: 'something wrong', error: error.message })
  }
}
const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params

    const url = await Url.findOne({ shortCode })

    if (!url) {
      return res.status(404).json({ message: 'Not get a link!' })
    }
    url.clicks += 1
    url.clickData.push({
      timestamp: new Date(),
      country: req.headers['x-country'] || 'Unknown',
      device: req.headers['user-agent']?.includes('Mobile') ? 'Mobile' : 'Desktop'
    })

    await url.save()

    res.redirect(url.originalUrl)

  } catch (error) {
    console.log('Redirect error:', error.message)
    res.status(500).json({ message: 'something wrong', error: error.message })
  }
}

const getAnalytics = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.userId })

    res.json(urls)

  } catch (error) {
    console.log('Analytics error:', error.message)
    res.status(500).json({ message: 'something wrong', error: error.message })
  }
}

module.exports = { createShortUrl, redirectUrl, getAnalytics }