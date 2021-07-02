import { useRegistrationForm } from '../../hooks/useRegistrationForm'
import { PageHeader } from '../index'
import './Signup.css'

export default function Signup({ setAppState }) {
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit} = useRegistrationForm({setAppState})

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
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-input">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" name="passwordConfirm" placeholder="*********" value={form.passwordConfirm} onChange={handleOnInputChange}/>
            {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
          </div>

          {errors.form && <span className="error">{errors.form}</span>}
          <button className='signup-btn' onClick={handleOnSubmit}>
            {isLoading ? <>Loading</> : <>Signup</>}
          </button>
        </div>
      </div>
    </div>
  )
}