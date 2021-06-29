
import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Exercise.css'

export default function Exercise({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email)
  

  return (
    <div className="Exercise">
      {isAuthenticated ? 
      <>
        <PageHeader sectionName='Exercise'/>
        <Link to='/exercise/create' className='exercise-btn'>Add Exercise</Link>
        <div>

        </div>
      </>
      : 
      <Nouser page='exercise info'/>
      }
    </div>
  )
}