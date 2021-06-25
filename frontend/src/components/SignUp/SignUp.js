import { useState } from 'react'
import axios from 'axios'
import PageHeader from '../PageHeader/PageHeader'
import './Signup.css'

export default function Signup() {
  // const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    date: ""
  })

  const handleOnInputChange = (event) => {
    // check that password confirm is equal to password
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    // check that password is equal to password confirm
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
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
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsLoading(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        date: form.date,
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      })
      if (res?.data?.user) {
        // setAppState(res.data)
        setIsLoading(false)
        // navigate("/portal")
      } else {
        setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
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
    <div className="Signup">
      <PageHeader sectionName='Sign Up'/>
      <div className='form'>
        <div className='form-fields'>
          <div className='form-input-name'>
            <div className='form-input'>
              <label htmlFor='name'>First Name</label>
              <input type='text' name='firstName' placeholder='Code' value={form.firstName} onChange={handleOnInputChange} />
            </div>
            <div className='form-input'>
              <label htmlFor='name'>Last Name</label>
              <input type='text' name='lastName' placeholder='Path' value={form.lastName} onChange={handleOnInputChange} />
            </div>
          </div>

          <div className='form-input'>
              <label htmlFor='name'>Username</label>
              <input type='text' name='username' placeholder='codepath' value={form.username} onChange={handleOnInputChange} />
            </div>
        
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="user@codepath.org" value={form.email} onChange={handleOnInputChange}/>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="*********" value={form.password} onChange={handleOnInputChange}/>
            {/* {errors.password && <span className="error">{errors.password}</span>} */}
          </div>

          <div className="form-input">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" name="passwordConfirm" placeholder="*********" value={form.passwordConfirm} onChange={handleOnInputChange}/>
            {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
          </div>

          <button className='login-btn' onClick={handleOnSubmit}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}