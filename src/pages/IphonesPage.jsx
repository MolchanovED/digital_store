import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modelNames = {
  1: 'iPhone 16 Pro',
  2: 'iPhone 16 Pro Max',
  3: 'iPhone 16',
  4: 'iPhone 16e',
  5: 'iPhone 15 Pro Max',
  6: 'iPhone 15 Pro',
  7: 'iPhone 15',
};

const IphonesPage = () => {
  const [iphones, setIphones] = useState([]);
  const [filteredModel, setFilteredModel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/iphones');
        setIphones(res.data);
      } catch (err) {
        console.error('Error fetching iphones:', err);
      }
    };
    fetchData();
  }, []);

  const filteredIphones = filteredModel
    ? iphones.filter((phone) => phone.model_code === filteredModel)
    : iphones;

  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f7', minHeight: '100vh', marginTop: '40px' }}>
      {/* Кнопки фільтрації */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}
      >
        {Object.entries(modelNames).map(([code, name]) => (
          <div
            key={code}
            onClick={() => setFilteredModel(Number(code))}
            style={{
              cursor: 'pointer',
              textAlign: 'center',
              borderBottom:
                filteredModel === Number(code) ? '2px solid #0071e3' : '2px solid transparent',
              paddingBottom: '10px',
              width: '80px'
            }}
          >
            <img
              src={`/icons/${code}.png`}
              alt={`icon-${name}`}
              style={{
                height: '50px',
                marginBottom: '8px',
                opacity: filteredModel === Number(code) ? 1 : 0.4
              }}
            />
            <p style={{ fontSize: '14px', color: '#000' }}>{name}</p>
          </div>
        ))}
        <div
          onClick={() => setFilteredModel(null)}
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            borderBottom: filteredModel === null ? '2px solid #0071e3' : '2px solid transparent',
            paddingBottom: '10px',
            minWidth: '80px'
          }}
        >
          <img
            src="/icons/all.png"
            alt="all"
            style={{ height: '50px', marginBottom: '8px', opacity: filteredModel === null ? 1 : 0.3 }}
          />
          <p style={{ fontSize: '14px', color: '#000' }}>Всі</p>
        </div>
      </div>

      {/* Список товарів */}
      {filteredIphones.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Немає товарів</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '30px'
          }}
        >
          {filteredIphones.map((phone) => (
            <div
              key={phone.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '20px',
                padding: '30px 20px',
                backgroundColor: '#fff',
                textAlign: 'center'
              }}
            >
              <img
                src={`http://localhost:3000${phone.images[0]}`}
                alt={phone.title}
                style={{
                  height: '200px',
                  objectFit: 'contain',
                  marginBottom: '15px'
                }}
              />

              {/* Кольоровий кружок */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: phone.color,
                    borderRadius: '50%',
                    border: '1px solid #ccc'
                  }}
                ></div>
              </div>

              <h3 style={{ fontWeight: '600', marginBottom: '5px', color: '#000' }}>{phone.title}</h3>
              <p style={{ fontSize: '14px', color: '#000', margin: '5px 0' }}>{phone.storage}</p>
              <p style={{ fontSize: '14px', color: '#000', margin: '5px 0' }}>SIM: {phone.sim_type}</p>
              <p style={{ fontSize: '16px', fontWeight: '500', margin: '5px 0 20px', color: '#000' }}>
                {parseFloat(phone.price).toFixed(2)}₴
              </p>

              <button
                onClick={() => navigate(`/iphones/${phone.id}`)}
                style={{
                  padding: '8px 18px',
                  backgroundColor: '#0071e3',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Купити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IphonesPage;
