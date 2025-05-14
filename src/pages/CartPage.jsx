import { useCart } from '../components/CartContext';
import { useState } from 'react';
import './CartPage.css';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, getTotal } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Замовлення:', cart, formData);
    alert('Замовлення оформлено!');
  };

  return (
    <div className="cart-container">
      <h1>Кошик</h1>
      <hr />

      {cart.length === 0 ? (
        <p>Ваш кошик порожній</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span>
                  <strong>{item.quantity || 1}x</strong>&nbsp;
                  {item.title} | {item.storage} | {item.sim_type} | {item.color}
                </span>
                <span>{parseFloat(item.price).toLocaleString()} грн</span>
                <div className="cart-actions">
                  <button onClick={() => addToCart(item)}>+</button>
                  <button onClick={() => removeFromCart(index)}>−</button>
                </div>
              </li>
            ))}
          </ul>

          <hr />

          <h2>Введіть дані</h2>
          <form onSubmit={handleSubmit} className="order-form">
            <input
              type="text"
              name="firstName"
              placeholder="Ім’я"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Прізвище"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Адреса"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="form-footer">
              <button type="submit" className="submit-btn">
                Оформити замовлення
              </button>
              <span className="total">
                Сумма:&nbsp;
                <strong>{getTotal()} грн</strong>
              </span>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
