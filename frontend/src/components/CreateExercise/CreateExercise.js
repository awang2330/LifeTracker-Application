import { useState } from 'react'
import { useNavigate } from 'react-router'
import './CreateExercise.css'

export default function CreateExercise({ appState, user, handleUpdateExercise }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    category: '',
    duration: '',
    intensity: ''
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === 'duration') {
      // check if integer
    }
    if (event.target.name === 'intensity') {
      // check if integer and range
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSave = () => {
    handleUpdateExercise(form)
    navigate('/exercise')
  }

  return (
    <div className='CreateExercise'>
      <div className='form'>
        <div className='form-fields'>
          <div className='form-input'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' placeholder='Exercise name' value={form.name} onChange={handleOnInputChange}/>
          </div>
          <div className='form-input'>
            <label htmlFor='category'>Category</label>
            <input type='text' name='category' placeholder='Exercise category' value={form.category} onChange={handleOnInputChange}/>
          </div>
          <div className="form-input">
            <label htmlFor="duration">Duration (min)</label>
            <input type="number" name="duration" min="1" max="100000000" value={form.duration} onChange={handleOnInputChange}/>
           </div>
           <div className="form-input">
            <label htmlFor="intensity">Intensity (1-10)</label>
            <input type="number" name="intensity" min="1" max="10" value={form.intensity} onChange={handleOnInputChange}/>
           </div>
          {errors.form && <span className="error">{errors.form}</span>}
          <button className='login-btn' onClick={handleOnSave}>Save</button>
        </div>
      </div>
    </div>
  )
}