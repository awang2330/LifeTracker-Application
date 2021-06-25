
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PageHeader from '../PageHeader/PageHeader'
import './Login.css'

export default function Login({ setAppState }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, form)
      if (res?.data) {
        // setAppState(res.data)
        setIsLoading(false)
        // navigate("/portal")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }

  return (
    <div className="Login">
      <PageHeader sectionName='Login'/>
      <div>

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

        <div className='login-footer'>
          <p>Don't have an account? Sign up <Link to="/register">here</Link></p>
        </div>
      </div>
    </div>
  )
}