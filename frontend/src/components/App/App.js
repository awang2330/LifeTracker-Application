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
import API from '../../services/apiClient'

export default function App() {
  const [appState, setAppState] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [exercises, setExercises] = useState({}) 

  const handleLogout = async () => {
    await API.logoutUser()
    setAppState({})
    setErrors(null)
  }

  const handleUpdateExercise = ({ newExercise}) => {
    setExercises(oldExercises => [...oldExercises, newExercise])
  }

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true)
      const { data, error } = await API.fetchExercises()
      if (data) {
        setExercises(data)
      }
      if (error) {
        setErrors((e) => ({ ...e, error }))
      }
      setIsLoading(false)
    }
    fetchExercises()
  }, [])

  console.log(exercises)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setAppState={setAppState} user={appState?.user} handleLogout={handleLogout}/>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/activity' element={ <Activity appState={appState} user={appState?.user}/>} />
          <Route path='/exercise' element={ <Exercise appState={appState} user={appState?.user} exercises={exercises}/>} />
          <Route path='/nutrition' element={ <Nutrition appState={appState} user={appState?.user}/>} />
          <Route path='/sleep' element={ <Sleep appState={appState} user={appState?.user}/>} />
          <Route path='/signup' element={ <Signup setAppState={setAppState}/>} />
          <Route path='/login' element={ <Login setAppState={setAppState}/>} />

          <Route path='/exercise/create' element={ <CreateExercise appState={appState} user={appState?.user} handleUpdateExercise={handleUpdateExercise}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}