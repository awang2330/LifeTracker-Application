import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'

import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Activity from '../Activity/Activity'
import Exercise from '../Exercise/Exercise'
import Nutrition from '../Nutrition/Nutrition'
import Sleep from '../Sleep/Sleep'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'

import CreateExercise from '../CreateExercise/CreateExercise'

import './App.css'
import e from 'express'

export default function App() {
  const [appState, setAppState] = useState({})
  const [exercies, setExercises] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const req = await axios.get("http://localhost:3001/activity/exercises")
        const exercises = req?.data?.exercises
        if (exercises) {
          setExercises(exercises)
        }
      } catch(err) {
        setErrors(e => ({...e, err}))
      }
    }
    fetchExercises()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setAppState={setAppState} user={appState?.user}/>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/activity' element={ <Activity appState={appState} user={appState?.user}/>} />
          <Route path='/exercise' element={ <Exercise appState={appState} user={appState?.user}/>} />
          <Route path='/nutrition' element={ <Nutrition appState={appState} user={appState?.user}/>} />
          <Route path='/sleep' element={ <Sleep appState={appState} user={appState?.user}/>} />
          <Route path='/signup' element={ <Signup setAppState={setAppState}/>} />
          <Route path='/login' element={ <Login setAppState={setAppState}/>} />

          <Route path='/exercise/create' element={ <CreateExercise appState={appState} user={appState?.user}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}