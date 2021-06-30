import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Nutrition.css'

export default function Nutrition({ user, setAppState, nutritions = [] }) {
  const isAuthenticated = Boolean(user?.email)

  return (
    <div className="Nutrition">
      {isAuthenticated ? 
      <>
        <PageHeader sectionName='Nutrition'/>
        <div className='aty-btn'>
          <Link to='/nutrition/create' className='nutrition-btn'>Add Nutrition</Link>
        </div>
        
        <div className='aty-section'>
          {nutritions.length > 0 ?
            nutritions.map((item) => (
              <div key={item.id} className='aty-card'>
                <div className='aty-type'>
                  <div className='aty-name'>{item.name}</div>
                  <div className='aty-category'>{item.category}</div>
                </div>
                <div className='aty-stats'>
                  <div>Duration:<span>{item.duration}</span></div>
                  <div>Intensity:<span>{item.intensity}</span></div>
                </div>
                <div className='aty-meta'>
                  <div>{item.date}</div>
                </div>
              </div>
            )) : <div>No data yet</div>
          }
        </div>
      </>
      : 
      <Nouser page='nutrition info'/>
      }
    </div>
  )
}