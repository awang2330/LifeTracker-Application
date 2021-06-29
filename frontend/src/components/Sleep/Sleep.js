import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Sleep.css'

export default function Sleep({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email)

  return (
    <div className="Sleep">
      {isAuthenticated ? 
      <>
        <PageHeader sectionName='Sleep'/>
        <Link to='/sleep/create' className='sleep-btn'>Add Sleep</Link>
        <div></div>
      </>
      : 
      <Nouser page='sleep info'/>
      }
    </div>
  )
}