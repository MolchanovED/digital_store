import { useCart } from '../components/CartContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function SummaryPage() {
  const { cart, clearCart, getTotal } = useCart()
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('orderUserData')
    if (data) setUserData(JSON.parse(data))
  }, [])

  const handleConfirm = () => {
    console.log('Замовлення:', { userData, items: cart, total: getTotal() })
    clearCart()
    localStorage.removeItem('orderUserData')
    navigate('/success')
  }

  if (!userData) return <p>Завантаження...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Підсумок замовлення</h1>

      <h2>Ваші товари:</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} — {item.price} грн
          </li>
        ))}
      </ul>

      <h2>Контактні дані:</h2>
      <p><strong>Ім’я:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Телефон:</strong> {userData.phone}</p>
      <p><strong>Коментар:</strong> {userData.comment}</p>

      <h2>Загальна сума: {getTotal()} грн</h2>

      <button onClick={handleConfirm}>Підтвердити замовлення</button>
    </div>
  )
}
