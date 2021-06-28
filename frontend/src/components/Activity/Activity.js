
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Activity.css'

export default function Activity({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email)

  return (
    <div className="Activity"> 
    {isAuthenticated ? 
    <>
      <PageHeader sectionName='Activity'/>
      <div className="activity-btns">
        <button className='exercise-btn'>Add Exercise</button>
        <button className='nutrition-btn'>Record Nutrition</button>
        <button className='sleep-btn'>Log Sleep</button>
      </div>
    </> : 
      <Nouser page='activity'/>
    }
    </div>
  )
}