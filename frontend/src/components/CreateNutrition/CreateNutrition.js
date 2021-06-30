import { useState } from 'react'
import { useNavigate } from 'react-router'
import PageHeader from '../PageHeader/PageHeader'
import API from '../../services/apiClient'
import './CreateNutrition.css'

export default function CreateNutrition({ handleUpdateNutrition  }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    calories: '',
    imageUrl: ''
  })

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSave = async () => {
    setErrors({})
    if (form.name === '') {
      setErrors((e) => ({ ...e, name: "This field is required" }))
      return
    }
    if (form.category === '') {
      setErrors((e) => ({ ...e, category: "This field is required" }))
      return
    }
    if (form.quantity === '') {
      setErrors((e) => ({ ...e, form: "Invalid quantity" }))
      return
    }
    if (form.calories === '') {
      setErrors((e) => ({ ...e, form: "Invalid calorie count" }))
      return
    }
    setIsLoading(true)
    const { data, error } = await API.createNutrition({
      name: form.name,
      category: form.category,
      quantity: form.quantity,
      calories: form.calories,
      image_url: form.imageUrl
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
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className='form-input'>
            <label htmlFor='category'>Category</label>
            <input type='text' name='category' placeholder='Nutrition category' value={form.category} onChange={handleOnInputChange}/>
            {errors.category && <span className="error">{errors.category}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" name="quantity" min="1" max="100000000" value={form.quantity} onChange={handleOnInputChange}/>
            {errors.quantity && <span className="error">{errors.quantity}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="calories">Calories</label>
            <input type="number" name="calories" min="1" max="100000000" value={form.calories} onChange={handleOnInputChange}/>
            {errors.calories && <span className="error">{errors.calories}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" placeholder="" value={form.image_url} onChange={handleOnInputChange}/>
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