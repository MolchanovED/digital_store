import React from 'react';
import './PromoBlock.css';
import iphoneImg from '../assets/images/iphone-promo.png';
import { useNavigate } from 'react-router-dom';

const PromoBlock = () => {
  const navigate = useNavigate();

  return (
    <section className="promo">
      <div className="promo-text">
        <h1>iPhone</h1>
        <h2>Вибери новий iPhone</h2>
        <button className="promo-button" onClick={() => navigate('/iphones')}>Детальніше</button>
      </div>
      <img src={iphoneImg} alt="iPhone" className="promo-image" />
    </section>
  );
};

export default PromoBlock;
