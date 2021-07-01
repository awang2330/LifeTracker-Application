import { Link } from 'react-router-dom'

import clock from '../../assets/risto_pekkala_Alarm_clock.svg'
import './Navbar.css'

export default function Navbar( { user, handleLogout }) {
  const isAuthenticated = Boolean(user?.email)

  return (
    <div className="Navbar">
      <Link to='/' className='home-link'>
        <img src={clock} alt="Clip Art Alarm Clock"/>
      </Link>
      <div>
        <Link to='/activity'>Activity</Link>
        <Link to='/exercise'>Exercise</Link>
        <Link to='/nutrition'>Nutrition</Link>
        <Link to='/sleep'>Sleep</Link>
        {isAuthenticated ? 
        <button className="logout-link" onClick={handleLogout}>Logout</button> : 
        <>
          <Link to='/login' className='login-link'>Login</Link>
          <Link to='/signup' className='signup-link'>Signup</Link>
        </> 
        }
      </div>
    </div>
  )
}