const express = require('express')
const router = express.Router()
const { requireAuthenticateUser } = require('../middleware/security')

const Activity =  require('../models/activity')

router.get('/exercises', requireAuthenticateUser, async (req, res, next) => {
  try {
    const user = res.locals.user
    const listExercises = await Activity.listExercises({ user })
    return res.status(201).json({ listExercises })
  } catch (err) {
    next(err)
  }
})

router.post('/exercise', requireAuthenticateUser, async (req, res, next) => {
  try {
    const user = res.locals.user
    const exercise = req.body.exercise
    console.log("body ", req.body)
    console.log(exercise)
    const newExercise = await Activity.createExercise({ exercise, user })
    return res.status(201).json({ newExercise })
  } catch (err) {
    next(err)
  }
})

router.get('/nutritions', requireAuthenticateUser, async (req, res, next) => {
  try {
    const user = res.locals.user
    const listNutritions = await Activity.listNutritions({ user })
    return res.status(201).json({ listNutritions })
  } catch (err) {
    next(err)
  }
})

router.post('/nutrition', requireAuthenticateUser, async (req, res, next) => {
  try {
    const user = res.locals.user
    const nutrition = req.body.nutrition
    const newNutrition = await Activity.createNutrition({ nutrition, user })
    return res.status(201).json({ newNutrition })
  } catch (err) {
    next(err)
  }
})

router.post('/sleep', requireAuthenticateUser, async (req, res, next) => {
  try {
    const user = res.locals.user
    const sleep = req.body.sleep
    const newSleep = await Activity.createSleep({ sleep, user })
    return res.status(201).json({ newSleep })
  } catch (err) {
    next(err)
  }
})

module.exports = router