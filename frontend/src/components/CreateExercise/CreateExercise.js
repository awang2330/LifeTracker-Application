import { useState } from 'react'
import { useNavigate } from 'react-router'
import PageHeader from '../PageHeader/PageHeader'
import API from '../../services/apiClient'
import './CreateExercise.css'

export default function CreateExercise({ handleUpdateExercise }) {
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
    // if (event.target.name === 'duration') {
    //   if (event.target.value !== parseInt(event.target.value, 10)) {
    //     setErrors((e) => ({ ...e, duration: "Please enter an integer" }))
    //   }
    //   else {
    //     setErrors((e) => ({ ...e, duration: null }))
    //   }
    // }
    // if (event.target.name === 'intensity') {
    //   if (event.target.value !== parseInt(event.target.value, 10)) {
    //     setErrors((e) => ({ ...e, intensity: "Please enter an integer value 1-10" }))
    //   }
    //   else {
    //     setErrors((e) => ({ ...e, intensity: null }))
    //   }
    // }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSave = async () => {
    setErrors({})
    if (form.duration === '') {
      setErrors((e) => ({ ...e, form: "Invalid duration time" }))
      return
    }
    if (form.intensity === '') {
      setErrors((e) => ({ ...e, form: "Invalid intensity level" }))
      return
    }
    if (form.intensity < 1 || form.intensity > 10) {
      setErrors((e) => ({ ...e, form: "Intensity must be in range 1-10" }))
      return
    }
    setIsLoading(true)
    const { data, error } = await API.createExercise({
      name: form.name,
      category: form.category,
      duration: form.duration,
      intensity: form.intensity
    }) 
    if (data?.newExercise) {
      handleUpdateExercise(data.newExercise)
    }
    if (error) {
      console.log(error)
      setErrors(e => ({...e, error}))
    }
    setIsLoading(false)
    navigate('/exercise')
  }

  return (
    <div className='CreateExercise'>
      <PageHeader sectionName='Exercise'/>
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
            {errors.duration && <span className="error">{errors.duration}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="intensity">Intensity (1-10)</label>
            <input type="number" name="intensity" min="1" max="10" value={form.intensity} onChange={handleOnInputChange}/>
            {errors.intensity && <span className="error">{errors.intensity}</span>}
          </div>
          {errors.form && <span className="error">{errors.form}</span>}
          <button className='login-btn' onClick={handleOnSave}>
            {isLoading ? <>Loading</> : <>Save</>}
          </button>
        </div>
      </div>
    </div>
  )
}