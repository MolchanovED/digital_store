import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './IphoneDetailsPage.css';
import PromoDoubleBlock from '../components/PromoDoubleBlock';
import { useCart } from '../components/CartContext';

const MacbookDetailsPage = () => {
  const { id } = useParams();
  const [macbook, setMacbook] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3000/api/macbooks/${id}`)
      .then(res => res.json())
      .then(data => {
        setMacbook(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      });
  }, [id]);

  if (!macbook) return <div>Loading...</div>;

  return (
    <>
      <div className="iphone-details-container">
        <div className="iphone-images">
          <img
            className="main-image"
            src={`http://localhost:3000${mainImage}`}
            alt={macbook.title}
          />
          <div className="thumbnail-row">
            {macbook.images.map((img, idx) => (
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
          <h1>{macbook.title}</h1>
          <div className="info-chip">{macbook.ram}</div>
          <div className="info-chip">{macbook.chip}</div>
          <div
            className="color-dot"
            style={{ backgroundColor: macbook.color }}
          ></div>
          <hr />
          <div className="price">
            {parseFloat(macbook.price).toLocaleString()} грн
          </div>
          <button
            className="add-to-cart"
            onClick={() => addToCart(macbook)}
          >
            Додати у кошик
          </button>
        </div>
      </div>

      <PromoDoubleBlock />
    </>
  );
};

export default MacbookDetailsPage;
