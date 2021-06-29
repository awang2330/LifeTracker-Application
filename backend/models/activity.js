const db = require('../db')
const { BadRequestError, UnauthorizedError } = require('../utils/errors')

class Activity {
  static async createExercise({ exercise, user }) {
    console.log("exercise")
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`)
    }

    const reqFields = ['name', 'category', 'duration', 'intensity']
    reqFields.forEach(field => {
      if (!exercise.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`)
      }
    })

    const results = await db.query(`
      INSERT INTO exercises (user_id, name, category, duration, intensity)
      VALUES ((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5)
      RETURNING id,
                user_id AS "userId",
                name, 
                category,
                duration,
                intensity,
                date;
      `,
      [
        user.username,
        exercise.name,
        exercise.category,
        exercise.duration,
        exercise.intensity
      ]
    )

    return results.rows[0]

  }

  static async createNutrition({ nutrition, user }) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`)
    }

  }

  static async createSleep({ sleep, user }) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`)
    }

  }
}

module.exports = Activity