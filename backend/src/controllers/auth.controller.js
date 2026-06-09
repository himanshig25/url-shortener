const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: ' This Email is already registered' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({ message: 'Account Created!' })

  } catch (error) {
    console.log('Register error:', error.message)
    res.status(500).json({ message: 'Something Wrong', error: error.message })
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Wrong!! Either email or Password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong!! Either email or Password' })
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, user: { name: user.name, email: user.email } })

   } catch (error) {
  console.error("REGISTER ERROR FULL:", error);

  res.status(500).json({
    message: "something wrong",
    error: error.message,
    stack: error.stack
  });
} 
}

module.exports = { register, login }