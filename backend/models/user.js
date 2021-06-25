const db = require('../db')
const bcrypt = require('bcrypt')
const { BCRYPT_WORK_FACTOR } = require('../config')
const { BadRequestError, UnauthorizedError } = require('../utils/errors')

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.is_admin,
      createdAt: user.created_at,
    }
  }

  static async login(creds) {
    const reqFields = ["email", "password"]
    reqFields.forEach(field => {
      if (!creds.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`)
      }
    })
    const user = await User.fetchUserByEmail(creds.email)
    if (user) {
      // compare entered password with password in database
      const isValid = await bcrypt.compare(creds.password, user.password)
      if (isValid) {
        return User.makePublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid email/password")
  }

  static async register(creds) {
    const reqFields = ["email", "password", "username"]
    console.log(creds)
    reqFields.forEach(field => {
      if (!creds.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`)
      }
    })

    if (creds.email.indexOf("@") <= 0) {
      console.log("email error")
      throw new BadRequestError("Invalid email.")
    }

    const existingUser = await User.fetchUserByEmail(credentials.email)
    if (existingUser) {
      throw new BadRequestError(`A user already exists with email: ${credentials.email}`)
    }

    const hashedPassword = await bcrypt.hash(creds.password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = creds.email.toLowerCase()

    // insert new user into database
    console.log("insert")
    const userResult = await db.query(
      `INSERT INTO users(email, password, is_admin)
       VALUES ($1, $2, $3)
       RETURNING id, email, is_admin, created_at;
      `, [normalizedEmail, hashedPassword, creds.isAdmin]
    )

    const user = userResult.rows[0]

    return User.makePublicUser(user)
  }


  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided")
    }
    const query = `SELECT * FROM users WHERE email = $1`
    const result = await db.query(query, [email.toLowerCase()])
    const user = result.rows[0]
    return user
  }
}

module.exports = User