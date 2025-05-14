import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('orderUserData', JSON.stringify(formData))
    navigate('/summary')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Контактні дані</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім’я*: </label>
          <input name="name" required value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Телефон*: </label>
          <input name="phone" required value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Коментар: </label>
          <input name="comment" value={formData.comment} onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Переглянути підсумок</button>
      </form>
    </div>
  )
}
