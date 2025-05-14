import React, { useState } from 'react';
import './CartSidebar.css';
import { useCart } from './CartContext';

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, addToCart, removeFromCart, getTotal } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Замовлення оформлено!');
    onClose();
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-sidebar-header">
        <h2>Кошик</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      <div className="cart-sidebar-content">
        {cart.length === 0 ? (
          <p className="empty-cart">Ваш кошик порожній</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <div>
                    <strong>{item.title}</strong><br />
                    {item.storage} / {item.color} / {item.sim_type}
                  </div>
                  <div>
                    {parseFloat(item.price).toLocaleString()} грн
                    <div className="cart-actions">
                      <button onClick={() => addToCart(item)}>+</button>
                      <button onClick={() => removeFromCart(index)}>−</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="order-form">
              <input name="firstName" placeholder="Ім’я" onChange={handleChange} required />
              <input name="lastName" placeholder="Прізвище" onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
              <input name="address" placeholder="Адреса" onChange={handleChange} required />

              <div className="form-footer">
                <button type="submit" className="submit-btn">Оформити замовлення</button>
                <span className="total">Сума: <strong>{getTotal()} грн</strong></span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
