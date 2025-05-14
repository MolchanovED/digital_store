import React from 'react';
import './PromoDoubleBlock.css';
import airpodsImage from '../assets/images/airpods.png'; 
import ipadImage from '../assets/images/ipad.png'; 
import { useNavigate } from 'react-router-dom';

const PromoDoubleBlock = () => {
  const navigate = useNavigate();

  return (
    <div className="double-container">
      <div className="double-card">
        <div className="double-content">
          <h1>AirPods Max</h1>
          <h2>Кольоритне звучання</h2>
          <button className="double-button" onClick={() => navigate('/airpods')}>Детальніше</button>
          <img src={airpodsImage} alt="AirPods Max" className="double-image" />
        </div>
      </div>

      <div className="double-card">
        <div className="double-content">
          <h1>iPad Air</h1>
          <h2>Тепер ще більше потужності</h2>
          <button className="double-button" onClick={() => navigate('/ipads')}>Детальніше</button>
          <img src={ipadImage} alt="iPad Air" className="double-image" />
        </div>
      </div>
    </div>
  );
};

export default PromoDoubleBlock;
