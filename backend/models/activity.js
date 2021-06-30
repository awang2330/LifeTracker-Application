const db = require('../db')
const { BadRequestError, UnauthorizedError } = require('../utils/errors')

class Activity {
  /** Return a lsit of all exercises of an user */
  static async listExercises({ user }) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`)
    }

    const results = await db.query(`
      SELECT id, user_id AS "userId", name, category, duration, intensity, date
      FROM exercises
      WHERE user_id = (
        SELECT id FROM users WHERE username = $1
      );
    `, [user.username]
    )
    return results.rows
  }

  /** Create an exercise into exercises table */
  static async createExercise({ exercise, user }) {
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

  /** Return a lsit of all nutritions of an user */
  static async listNutritions({ user }) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`)
    }

    const results = await db.query(`
      SELECT id, user_id AS "userId", name, category, quantity, calories, image_url AS "imageUrl", date
      FROM nutritions
      WHERE user_id = (
        SELECT id FROM users WHERE username = $1
      );
    `, [user.username]
    )
    return results.rows
  }

  static async createNutrition({ nutrition, user }) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`)
    }

    const reqFields = ['name', 'category', 'quantity', 'calories', 'image_url']
    reqFields.forEach(field => {
      if (!nutrition.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`)
      }
    })

    const results = await db.query(`
      INSERT INTO nutritions (user_id, name, category, quantity, calories, image_url)
      VALUES ((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5, $6)
      RETURNING id,
                user_id AS "userId",
                name, 
                category,
                quantity,
                calories,
                image_url AS "imageUrl",
                date;
      `,
      [
        user.username,
        nutrition.name,
        nutrition.category,
        nutrition.quantity,
        nutrition.calories,
        nutrition.image_url
      ]
    )

    return results.rows[0]
  }

  static async createSleep({ sleep, user }) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`)
    }

    const reqFields = ['start_date', 'end_date']
    reqFields.forEach(field => {
      if (!sleep.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`)
      }
    })

    const results = await db.query(`
      INSERT INTO sleeps (user_id, start_date, end_date)
      VALUES ((SELECT id FROM users WHERE username = $1), $2, $3)
      RETURNING id,
                user_id AS "userId",
                start_date AS "startDate",
                end_date AS "endDate",
                date;
      `,
      [
        user.username,
        new Date(sleep.start_date),
        new Date(sleep.end_date)
      ]
    )

    return results.rows[0]
  }
}

module.exports = Activity