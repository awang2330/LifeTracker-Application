import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Activity.css'

export default function Activity({ user, setAppState, totalExerciseTime }) {
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
      {totalExerciseTime > 0 ?
        <div className='aty-card'>
          <div className='aty-stats'>
            <div>Total Exercise Time (minutes): <span>{totalExerciseTime}</span></div>
          </div>
        </div>
        : <div>No data yet</div>
      }
    </> : 
      <Nouser page='activity'/>
    }
    </div>
  )
}