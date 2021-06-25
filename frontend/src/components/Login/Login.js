
import { useState } from 'react'
import PageHeader from '../PageHeader/PageHeader'
import './Login.css'

export default function Login() {
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleOnInputChange = () => {

  }

  const handleOnSubmit = () => {

  }
  
  return (
    <div className="Login">
      <PageHeader sectionName='Login'/>
      <div className='form'>
        <div className='form-input'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' placeholder='user@codepath.org' value={form.email} onChange={handleOnInputChange}/>
        </div>
        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' placeholder='*********' value={form.password} onChange={handleOnInputChange}/>
        </div>
        <button className='login-btn' onClick={handleOnSubmit}>Login</button>
      </div>
    </div>
  )
}