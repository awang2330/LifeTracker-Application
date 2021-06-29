const express = require('express')
const router = express.Router()

const User = require('../models/user')
const { createUserJwt } = require('../utils/tokens')
const { requireAuthenticateUser } = require('../middleware/security')

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.login(req.body)
    const token = createUserJwt(user)
    return res.json({ user, token })
  } catch(err) {
    next(err)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false })
    console.log(user)
    const token = createUserJwt(user)
    return res.status(201).json({ user, token })
  } catch(err) {
    next(err)
  }
}) 

router.get('/me', requireAuthenticateUser, async(req, res, next) => {
  try {
    const { email } = res.locals.user
    const user =  await User.fetchUserByEmail(email)
    const publicUser = await User.makePublicUser(user)
    return res.json({ user: publicUser })
  } catch(err) {
    next(err)
  }
})

module.exports = router