import { useState } from 'react'
import { useNavigate } from 'react-router'
import PageHeader from '../PageHeader/PageHeader'
import API from '../../services/apiClient'
import './CreateSleep.css'

export default function CreateSleep({ handleUpdateSleep }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    startDate: '',
    endDate: ''
  })

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSave = async () => {
    setErrors({})
    setIsLoading(true)

    const { data, error } = await API.createSleep({
      start_date: form.startDate,
      end_date: form.endDate,
    }) 
    if (data?.newSleep) {
      handleUpdateSleep(data.newSleep)
    }
    if (error) {
      console.log(error)
      setErrors(e => ({...e, error}))
    }
    setIsLoading(false)
    navigate('/sleep')
  }
  return (
    <div className='CreateSleep'>
      <PageHeader sectionName='Sleep'/>
      <div className='form'>
        <div className='form-fields'>
          <div className='form-input'>
            <label htmlFor='startTime'>Start date</label>
            <input type='datetime-local' name='startDate' value={form.startDate} onChange={handleOnInputChange}/>
          </div>
          <div className='form-input'>
            <label htmlFor='endTime'>End date</label>
            <input type='datetime-local' name='endDate' value={form.endDate} onChange={handleOnInputChange}/>
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