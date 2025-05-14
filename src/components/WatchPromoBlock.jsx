import React from 'react';
import './WatchPromoBlock.css';
import watchImage from '../assets/images/watch.png';
import { useNavigate } from 'react-router-dom';

const WatchPromoBlock = () => {
  const navigate = useNavigate();

  return (
    <div className="watch-block">
      <h1>Apple WATCH</h1>
      <h2>Ще тонший. Класика.</h2>
      <button className="watch-button" onClick={() => navigate('/watches')}>Детальніше</button>
      <img src={watchImage} alt="Apple Watch" className="watch-image" />
    </div>
  );
};

export default WatchPromoBlock;
