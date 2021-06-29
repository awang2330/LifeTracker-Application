import { useState, useEffect } from "react"
import API from "../../services/apiClient"
import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Exercise.css'

export default function Exercise({ user, setAppState, exercises}) {
  const isAuthenticated = Boolean(user?.email)
  
  return (
    <div className="Exercise">
      {isAuthenticated ? 
      <>
        <PageHeader sectionName='Exercise'/>
        <Link className='exercise-btn' to='activity/exercises'>Add Exercise</Link>
        <div>
          {/* {exercises.map(item => (
            <div></div>
          ))} */}
        </div>
      </>
      : 
      <Nouser page='exercise info'/>
      }
    </div>
  )
}