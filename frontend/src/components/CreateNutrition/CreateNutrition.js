import { useState } from 'react'
import { useNavigate } from 'react-router'
import PageHeader from '../PageHeader/PageHeader'
import API from '../../services/apiClient'
import './createNutrition.css'

export default function CreateNutrition({ handleUpdateNutrition  }) {
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
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSave = async () => {
    setErrors({})
    setIsLoading(true)
    const { data, error } = await API.createNutrition({
      name: form.name,
      category: form.category,
      duration: form.duration,
      intensity: form.intensity
    }) 
    if (data?.newNutrition) {
      handleUpdateNutrition(data.newNutrition)
    }
    if (error) {
      console.log(error)
      setErrors(e => ({...e, error}))
    }
    setIsLoading(false)
    navigate('/nutrition')
  }

  return (
    <div className='CreateNutrition'>
      <PageHeader sectionName='Nutrition'/>
      <div className='form'>
        <div className='form-fields'>
          <div className='form-input'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' placeholder='Nutrition name' value={form.name} onChange={handleOnInputChange}/>
          </div>
          <div className='form-input'>
            <label htmlFor='category'>Category</label>
            <input type='text' name='category' placeholder='Nutrition category' value={form.category} onChange={handleOnInputChange}/>
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
          <button className='login-btn' onClick={handleOnSave}>Save</button>
        </div>
      </div>
    </div>
  )
}