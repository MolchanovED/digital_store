import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './IphoneDetailsPage.css';
import PromoDoubleBlock from '../components/PromoDoubleBlock';
import { useCart } from '../components/CartContext';

const IpadDetailsPage = () => {
  const { id } = useParams();
  const [ipad, setIpad] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3000/api/ipads/${id}`)
      .then(res => res.json())
      .then(data => {
        setIpad(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      });
  }, [id]);

  if (!ipad) return <div>Loading...</div>;

  return (
    <>
      <div className="iphone-details-container">
        <div className="iphone-images">
          <img className="main-image" src={`http://localhost:3000${mainImage}`} alt={ipad.title} />
          <div className="thumbnail-row">
            {ipad.images.map((img, idx) => (
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
          <h1>{ipad.title}</h1>
          <div className="info-chip">{ipad.ram}</div>
          <div className="info-chip">{ipad.chip}</div>
          <div className="color-dot" style={{ backgroundColor: ipad.color }}></div>
          <hr />
          <div className="price">{parseFloat(ipad.price).toLocaleString()} грн</div>
          <button className="add-to-cart" onClick={() => addToCart(ipad)}>Додати у кошик</button>
        </div>
      </div>
      <PromoDoubleBlock />
    </>
  );
};

export default IpadDetailsPage;
