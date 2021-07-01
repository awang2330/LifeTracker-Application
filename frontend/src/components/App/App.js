import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Activity from '../Activity/Activity'
import Exercise from '../Exercise/Exercise'
import Nutrition from '../Nutrition/Nutrition'
import Sleep from '../Sleep/Sleep'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'

import CreateExercise from '../CreateExercise/CreateExercise'
import CreateNutrition from '../CreateNutrition/CreateNutrition'
import CreateSleep from '../CreateSleep/CreateSleep'

import './App.css'
import API from '../../services/apiClient'

export default function App() {
  const [appState, setAppState] = useState({})
  const [errors, setErrors] = useState({})
  const [exercises, setExercises] = useState({}) 
  const [nutritions, setNutritions] = useState({}) 
  const [sleeps, setSleeps] = useState({}) 
  const [isLoading, setIsLoading] = useState(false)
  
  const [totalExerciseTime, setTotalExerciseTime] = useState(0)
  const [avgCalories, setAvgCalories] = useState(0)
  const [avgSleepTime, setAvgSleepTime] = useState(0)

  const handleLogIn = async () => {

  }
  const handleLogout = async () => {
    await API.logoutUser()
    setAppState({})
    console.log("app", appState)
    setErrors(null)
  }

    /** Fetch user by token generated */
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      console.log("refresh")
      const { data } = await API.fetchUserFromToken()
      if (data) {
        setAppState((a) => ({...a, user: data.user}))
      }
      setIsLoading(false)
    }

    // only set token if it exists
    const token = localStorage.getItem("life_tracker_token")
    if (token) {
      API.setToken(token)
      fetchUser()
    }
  }, [])

  const handleUpdateExercise = async (newExercise) => {
    setExercises(oldExercises => [...oldExercises, newExercise])
  }

  const handleUpdateNutrition = async (newNutrition) => {
    setNutritions(oldNutritions => [...oldNutritions, newNutrition])
  }

  const handleUpdateSleep = async (newSleep) => {
    setSleeps(oldSleeps => [...oldSleeps, newSleep])
  }

  /** Fetch exercises for user */
  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await API.fetchExercises()
      if (data?.listExercises) {
        setExercises(data.listExercises)
      }
      if (error) {
        setErrors((e) => ({ ...e, error }))
      }
    }
    fetchExercises()
  }, [])

  /** Fetch nutritions for user */
  useEffect(() => {
    const fetchNutritions = async () => {
      const { data, error } = await API.fetchNutritions()
      if (data?.listNutritions) {
        setNutritions(data.listNutritions)
      }
      if (error) {
        setErrors((e) => ({ ...e, error }))
      }
    }
    fetchNutritions()
  }, [])

  /** Fetch sleeps by user */
  useEffect(() => {
    const fetchSleeps = async () => {
      const { data, error } = await API.fetchSleeps()
      if (data?.listSleeps) {
        setSleeps(data.listSleeps)
      }
      if (error) {
        setErrors((e) => ({ ...e, error }))
      }
    }
    fetchSleeps()
  }, [])

   /** Fetch total exercise time by user */
   useEffect(() => {
    const fetchExerciseTime = async () => {
      const { data, error } = await API.fetchTotalExerciseTime()
      if (data?.totalTime) {
        setTotalExerciseTime(data.totalTime)
      }
      if (error) {
        setErrors((e) => ({ ...e, error }))
      }
    }
    fetchExerciseTime()
  }, [exercises, appState, isLoading])

  /** Fetch avg daily calories by user */
   useEffect(() => {
    const fetchAvgCalories = async () => {
      const { data, error } = await API.fetchAvgCalories()
      if (data?.avgCalories) {
        setAvgCalories(data.avgCalories)
      }
      if (error) {
        setErrors((e) => ({ ...e, error }))
      }
    }
    fetchAvgCalories()
  }, [nutritions, appState])


  /** Fetch avg sleep time by user */
  useEffect(() => {
    const fetchAvgSleepTime = async () => {
      const { data, error } = await API.fetchAvgSleepTime()
      if (data?.avgSleepHours) {
        setAvgSleepTime(data.avgSleepHours)
      }
      if (error) {
        setErrors((e) => ({ ...e, error }))
      }
    }
    fetchAvgSleepTime()
  }, [sleeps, appState])

  
  return (
    <div className="App">
      <BrowserRouter>
        {!isLoading ? 
        <>
        <Navbar user={appState?.user} handleLogout={handleLogout} isLoading={isLoading}/>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/activity' element={ <Activity appState={appState} user={appState?.user} totalExerciseTime={totalExerciseTime} avgCalories={avgCalories} avgSleepTime={avgSleepTime}/>} />
          <Route path='/exercise' element={ <Exercise appState={appState} user={appState?.user} exercises={exercises}/>} />
          <Route path='/nutrition' element={ <Nutrition appState={appState} user={appState?.user} nutritions={nutritions}/>} />
          <Route path='/sleep' element={ <Sleep appState={appState} user={appState?.user} sleeps={sleeps}/>} />
          <Route path='/signup' element={ <Signup handleLogIn={handleLogIn} setAppState={setAppState}/>} />
          <Route path='/login' element={ <Login handleLogIn={handleLogIn} setAppState={setAppState}/>} />

          <Route path='/exercise/create' element={ <CreateExercise appState={appState} user={appState?.user} handleUpdateExercise={handleUpdateExercise}/>} />
          <Route path='/nutrition/create' element={ <CreateNutrition appState={appState} user={appState?.user} handleUpdateNutrition={handleUpdateNutrition}/>} />
          <Route path='/sleep/create' element={ <CreateSleep appState={appState} user={appState?.user} handleUpdateSleep={handleUpdateSleep}/>} />
        </Routes>
        </> : null }
      </BrowserRouter>
    </div>
  )
}