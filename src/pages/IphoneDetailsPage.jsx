import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './IphoneDetailsPage.css';
import PromoDoubleBlock from '../components/PromoDoubleBlock';
import { useCart } from '../components/CartContext';

const IphoneDetailsPage = () => {
  const { id } = useParams();
  const [iphone, setIphone] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3000/api/iphones/${id}`)
      .then(res => res.json())
      .then(data => {
        setIphone(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      });
  }, [id]);

  if (!iphone) return <div>Loading...</div>;

  return (
    <>
      <div className="iphone-details-container">
        <div className="iphone-images">
          <img
            className="main-image"
            src={`http://localhost:3000${mainImage}`}
            alt={iphone.title}
          />
          <div className="thumbnail-row">
            {iphone.images.map((img, idx) => (
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
          <h1>{iphone.title}</h1>
          <div className="info-chip">{iphone.storage}</div>
          <div
            className="color-dot"
            style={{ backgroundColor: iphone.color }}
          ></div>
          <div className="info-chip">{iphone.sim_type}</div>
          <hr />
          <div className="price">
            {parseFloat(iphone.price).toLocaleString()} грн
          </div>
          <button
            className="add-to-cart"
            onClick={() => addToCart(iphone)}
          >
            Додати у кошик
          </button>
        </div>
      </div>

      <PromoDoubleBlock />
    </>
  );
};

export default IphoneDetailsPage;
