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
      date: user.date,
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
    console.log(creds)
    const reqFields = ["firstName", "lastName", "email", "password", "username"]
    console.log("fields")
    reqFields.forEach(field => {
      if (!creds.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`)
      }
    })

    console.log("email")
    if (creds.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.")
    }

    console.log("existing user")
    const existingUser = await User.fetchUserByEmail(creds.email)
    if (existingUser) {
      throw new BadRequestError(`A user already exists with email: ${creds.email}`)
    }

    const hashedPassword = await bcrypt.hash(creds.password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = creds.email.toLowerCase()

    console.log("insert")
    // insert new user into database
    const userResult = await db.query(
      `INSERT INTO users (first_name, last_name, username, email, password, date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, first_name, last_name, username, email, date;
      `, [creds.firstName, creds.lastName, creds.username, normalizedEmail, hashedPassword, creds.date]
    )

    console.log(userResult)
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