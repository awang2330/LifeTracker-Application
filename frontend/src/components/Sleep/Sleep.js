import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Sleep.css'

export default function Sleep({ user, setAppState, sleeps = [] }) {
  const isAuthenticated = Boolean(user?.email)

  return (
    <div className="Sleep">
      {isAuthenticated ? 
      <>
        <PageHeader sectionName='Sleep'/>
        <div className='aty-btn'>
          <Link to='/sleep/create' className='sleep-btn'>Add Sleep</Link>
        </div>
        
        <div className='aty-section'>
          {sleeps.length > 0 ?
            sleeps.map((item) => (
              <div key={item.id} className='aty-card'>
                <div className='aty-stats'>
                  <div>Start date: <span>{new Date(item.startDate).toLocaleString()}</span></div>
                  <div>End date: <span>{new Date(item.endDate).toLocaleString()}</span></div>
                </div>
                <div className='aty-meta'>
                  <div>{new Date(item.date).toLocaleString()}</div>
                </div>
              </div>
            )) : <div>No data yet</div>
          }
        </div>
      </>
      : 
      <Nouser page='sleep info'/>
      }
    </div>
  )
}