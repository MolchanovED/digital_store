import React from 'react';
import macbookImage from '../assets/images/macbook-air.png'; 
import './SecondBlock.css';
import { useNavigate } from 'react-router-dom';

const PromoBlockMacBook = () => {
  const navigate = useNavigate();

  return (
    <section className="second">
      <div className="second-text">
        <h1>MacBook Air</h1>
        <h2>Тепер ще більше потужності</h2>
        <button className="second-button" onClick={() => navigate('/macbooks')}>Детальніше</button>
      </div>
      <img src={macbookImage} alt="MacBook Air" className="second-image" />
    </section>
  );
};

export default PromoBlockMacBook;
