
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Nutrition.css'

export default function Nutrition({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email)

  return (
    <div className="Nutrition">
      {isAuthenticated ? 
      <>
        <PageHeader sectionName='Nutrition'/>
        <div></div>
      </>
      : 
      <Nouser page='nutrition info'/>
      }
    </div>
  )
}