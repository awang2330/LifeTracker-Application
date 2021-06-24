import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Activity from '../Activity/Activity'
import Exercise from '../Exercise/Exercise'
import Nutrition from '../Nutrition/Nutrition'
import Sleep from '../Sleep/Sleep'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'

import './App.css'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/activity' element={ <Activity />} />
          <Route path='/exercise' element={ <Exercise />} />
          <Route path='/nutrition' element={ <Nutrition />} />
          <Route path='/sleep' element={ <Sleep />} />
          <Route path='/signup' element={ <Signup />} />
          <Route path='/login' element={ <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}