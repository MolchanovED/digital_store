import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './IphoneDetailsPage.css';
import PromoDoubleBlock from '../components/PromoDoubleBlock';
import { useCart } from '../components/CartContext';

const AirpodsDetailsPage = () => {
  const { id } = useParams();
  const [airpods, setAirpods] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3000/api/airpods/${id}`)
      .then(res => res.json())
      .then(data => {
        setAirpods(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      });
  }, [id]);

  if (!airpods) return <div>Завантаження...</div>;

  return (
    <>
      <div className="iphone-details-container">
        <div className="iphone-images">
          <img className="main-image" src={`http://localhost:3000${mainImage}`} alt={airpods.title} />
          <div className="thumbnail-row">
            {airpods.images.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:3000${img}`}
                alt={`thumb-${idx}`}
                className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="iphone-info">
          <h1>{airpods.title}</h1>
          <div className="info-chip">{airpods.generation}</div>
          <div className="info-chip">{airpods.chip}</div>
          <div className="color-dot" style={{ backgroundColor: airpods.color }}></div>
          <hr />
          <div className="price">{parseFloat(airpods.price).toLocaleString()} грн</div>
          <button className="add-to-cart" onClick={() => addToCart(airpods)}>Додати у кошик</button>
        </div>
      </div>
      <PromoDoubleBlock />
    </>
  );
};

export default AirpodsDetailsPage;
