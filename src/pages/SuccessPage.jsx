import { Link } from 'react-router-dom'

export default function SuccessPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1> Замовлення успішно оформлено!</h1>
      <p>Дякуємо за покупку. Ми зв’яжемось з вами найближчим часом.</p>

      <Link to="/" style={{
        marginTop: '2rem',
        display: 'inline-block',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
         Повернутись на головну
      </Link>
    </div>
  )
}
