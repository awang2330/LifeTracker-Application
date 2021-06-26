const db = require('../db')
const bcrypt = require('bcrypt')
const { BCRYPT_WORK_FACTOR } = require('../config')
const { BadRequestError, UnauthorizedError } = require('../utils/errors')

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      username: user.username,
    }
  }

  static async login(creds) {
    console.log("login")
    console.log(creds)
    const reqFields = ["email", "password"]
    reqFields.forEach(field => {
      if (!creds.hasOwnProperty(field)) {
        console.log(`Missing ${field} in request body.`)
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

    console.log("Invalid email/password")
    throw new UnauthorizedError("Invalid email/password")
  }

  static async register(creds) {
    const reqFields = ["firstName", "lastName", "email", "password", "username"]
    console.log("fields")
    reqFields.forEach(field => {
      if (!creds.hasOwnProperty(field)) {
        console.log(`Missing ${field} in request body.`)
        throw new BadRequestError(`Missing ${field} in request body.`)
      }
    })

    if (creds.email.indexOf("@") <= 0) {
      console.log("Invalid email.")
      throw new BadRequestError("Invalid email.")
    }

    const existingUser = await User.fetchUserByEmail(creds.email)
    if (existingUser) {
      console.log(`A user already exists with email: ${creds.email}`)
      throw new BadRequestError(`A user already exists with email: ${creds.email}`)
    }

    const hashedPassword = await bcrypt.hash(creds.password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = creds.email.toLowerCase()

    const userResult = await db.query(
      `INSERT INTO users (first_name, last_name, username, email, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, username, email, is_admin, date;
      `, [creds.firstName, creds.lastName, creds.username, normalizedEmail, hashedPassword]
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