const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')
const { UnauthorizedError } = require('../utils/errors')

// create a function to extract the JWT from the request header
const jwtFrom = ({headers}) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split('')
    if (scheme.trim() === 'Bearer') {
      return token
    }
  }
  return undefined
}

// create a function to attach the use to the res object
const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(res)
    // check if valid token and attach to res.locals.user
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY)
    }
    return next()
  } catch(err) {
    return next()
  }
}

// create a function to verify a auth user
const requireAuthenticateUser = (req, res, next) => {
  try {
    console.log(res.locals)
    const { user } = res.locals
    if (user?.email) {
      throw new UnauthorizedError(``)
    }
    return next()
  } catch(err) {
    return next(err)
  }
}

module.exports = {
  extractUserFromJwt,
  requireAuthenticateUser
}