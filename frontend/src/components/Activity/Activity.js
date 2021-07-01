import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Activity.css'

export default function Activity({ user, setAppState, totalExerciseTime = 0, avgCalories = 0, avgSleepTime = 0 }) {
  const isAuthenticated = Boolean(user?.email)

  return (
    <div className="Activity"> 
    {isAuthenticated ? 
    <>
      <PageHeader sectionName='Activity'/>
      <div className="activity-btns">
        <Link to='/exercise/create' className='exercise-btn'>Add Exercise</Link>
        <Link to='/nutrition/create' className='nutrition-btn'>Add Nutrition</Link>
        <Link to='/sleep/create' className='sleep-btn'>Add Sleep</Link>
      </div>
      <div className='aty-section'>
        <div className='aty-card'>
          <div className='aty-stats'>
            <div>Total Exercise Time (minutes): <span>{totalExerciseTime}</span></div>
          </div>
        </div>
        <div className='aty-card'>
          <div className='aty-stats'>
            <div>Average Daily Calories: <span>{parseFloat(avgCalories).toFixed(2)}</span></div>
          </div>
        </div>
        <div className='aty-card'>
          <div className='aty-stats'>
            <div>Average Sleep Hours: <span>{parseFloat(avgSleepTime).toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </> : 
      <Nouser page='activity'/>
    }
    </div>
  )
}