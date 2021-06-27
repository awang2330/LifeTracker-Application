import { Link, useNavigate } from "react-router-dom"
import PageHeader from '../PageHeader/PageHeader'
import './Activity.css'

export default function Activity({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email)

  return (
    <div className="Activity"> 
    <PageHeader sectionName='Activity'/>
    </div>
  )
}