import { useState, useEffect } from "react"
import API from "../../services/apiClient"
import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import Nouser from "../Nouser/Nouser"
import './Exercise.css'

export default function Exercise({ user, setAppState, exercises }) {
  const isAuthenticated = Boolean(user?.email)
  
  return (
    <div className="Exercise">
      {isAuthenticated ? 
      <>
        <PageHeader sectionName='Exercise'/>
        <Link className='exercise-btn' to='/activity/exercises'>Add Exercise</Link>
        <div>
          {exercises ?
            exercises.map((item) => (
              <div key={item.id} className='aty-card'>
                <div className='aty-name'>{item.name}</div>
                <div className='aty-stats'>
                  <div>{item.duration}</div>
                  <div>{item.intensity}</div>
                </div>
                <div className='aty-category'>{item.category}</div>
              </div>
            )) : <div>No data yet</div>
          }
        </div>
      </>
      : 
      <Nouser page='exercise info'/>
      }
    </div>
  )
}