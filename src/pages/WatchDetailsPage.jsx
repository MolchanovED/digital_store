import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './IphoneDetailsPage.css';
import PromoDoubleBlock from '../components/PromoDoubleBlock';
import { useCart } from '../components/CartContext';

const WatchDetailsPage = () => {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3000/api/watches/${id}`)
      .then(res => res.json())
      .then(data => {
        setWatch(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      });
  }, [id]);

  if (!watch) return <div>Завантаження...</div>;

  return (
    <>
      <div className="iphone-details-container">
        <div className="iphone-images">
          <img className="main-image" src={`http://localhost:3000${mainImage}`} alt={watch.title} />
          <div className="thumbnail-row">
            {watch.images.map((img, idx) => (
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
          <h1>{watch.title}</h1>
          <div className="info-chip">{watch.size}</div>
          <div className="info-chip">{watch.chip}</div>
          <div className="color-dot" style={{ backgroundColor: watch.color }}></div>
          <hr />
          <div className="price">{parseFloat(watch.price).toLocaleString()} грн</div>
          <button className="add-to-cart" onClick={() => addToCart(watch)}>Додати у кошик</button>
        </div>
      </div>
      <PromoDoubleBlock />
    </>
  );
};

export default WatchDetailsPage;
