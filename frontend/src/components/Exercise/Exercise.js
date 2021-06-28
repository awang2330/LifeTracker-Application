
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
        <div></div>
      </>
      : 
      <Nouser />
      }
    </div>
  )
}