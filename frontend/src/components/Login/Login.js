
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../services/apiClient'
import PageHeader from '../PageHeader/PageHeader'
import './Login.css'

export default function Login({handleLogIn, setAppState }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") <= 0) {
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

    const { data, error } = await API.loginUser({ email: form.email, password: form.password })
    if (data) {
      API.setToken(data.token)
      setAppState((a) => ({...a, user: data.user}))
    }
    if (error) {
      console.log(errors)
      setErrors((e) => ({ ...e, form: error }))
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    navigate("/activity")
  }

  return (
    <div className="Login">
      <PageHeader sectionName='Login'/>
      <div className='form'>
        <div className='form-fields'>
          <div className='form-input'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' placeholder='user@codepath.org' value={form.email} onChange={handleOnInputChange}/>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className='form-input'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' placeholder='*********' value={form.password} onChange={handleOnInputChange}/>
          </div>
          {errors.form && <span className="error">{errors.form}</span>}
          <button className='login-btn' onClick={handleOnSubmit}>
            {isLoading ? <>Loading</> : <>Login</>}
          </button>
        </div>
      </div>
      <div className='login-footer'>
        <p>Don't have an account? Sign up <Link to="/signup">here</Link></p>
      </div>
    </div>
  )
}