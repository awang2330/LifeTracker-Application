
import PageHeader from '../PageHeader/PageHeader'
import './Login.css'

export default function Login() {
  return (
    <div className="Login">
      <PageHeader sectionName='Login'/>
      <div className='form'>
        <div className='form-input'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' placeholder='user@codepath.org'/>
        </div>
        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' placeholder='*********'/>
        </div>
        <button className='login-btn'>Login</button>
      </div>
    </div>
  )
}