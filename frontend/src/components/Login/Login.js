import { Link } from 'react-router-dom'
import { useLoginForm } from '../../hooks/useLoginForm'
import PageHeader from '../PageHeader/PageHeader'
import './Login.css'

export default function Login({ setAppState }) {
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } = useLoginForm({ setAppState })
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