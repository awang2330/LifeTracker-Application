import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/apiClient'

export const useLoginForm = ({  setAppState }) => {
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

  return {
    form,
    errors,
    isLoading,
    handleOnInputChange,
    handleOnSubmit
  }
}