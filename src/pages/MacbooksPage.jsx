import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modelNames = {
  1: 'MacBook Air M2',
  2: 'MacBook Air M3',
  3: 'MacBook Pro 14"',
  4: 'MacBook Pro 16"',
};

const MacbooksPage = () => {
  const [macbooks, setMacbooks] = useState([]);
  const [filteredModel, setFilteredModel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/macbooks');
        setMacbooks(res.data);
      } catch (err) {
        console.error('Error fetching macbooks:', err);
      }
    };
    fetchData();
  }, []);

  const filteredList = filteredModel
    ? macbooks.filter((item) => item.model_code === filteredModel)
    : macbooks;

  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f7', minHeight: '100vh', marginTop: '40px' }}>
      {/* Фільтрація по моделям */}
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
              fontSize: '14px',
              color: '#000'
            }}
          >
            {name}
          </div>
        ))}
        <div
          onClick={() => setFilteredModel(null)}
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            borderBottom: filteredModel === null ? '2px solid #0071e3' : '2px solid transparent',
            paddingBottom: '10px',
            fontSize: '14px',
            color: '#000'
          }}
        >
          Всі
        </div>
      </div>

      {/* Список товарів */}
      {filteredList.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Немає товарів</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '30px'
          }}
        >
          {filteredList.map((mac) => (
            <div
              key={mac.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '20px',
                padding: '30px 20px',
                backgroundColor: '#fff',
                textAlign: 'center'
              }}
            >
              <img
                src={`http://localhost:3000${mac.images[0]}`}
                alt={mac.title}
                style={{
                  height: '200px',
                  objectFit: 'contain',
                  marginBottom: '15px'
                }}
              />

              <h3 style={{ fontWeight: '600', marginBottom: '5px', color: '#000' }}>{mac.title}</h3>

              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: mac.color,
                  border: '1px solid #ccc',
                  margin: '8px auto'
                }}
              ></div>

              <p style={{ fontSize: '14px', color: '#000', margin: '5px 0' }}>
                {mac.ram} | {mac.chip}
              </p>

              <p style={{ fontSize: '16px', fontWeight: '500', margin: '5px 0 20px', color: '#000' }}>
                {parseFloat(mac.price).toFixed(2)}₴
              </p>

              <button
                onClick={() => navigate(`/macbooks/${mac.id}`)}
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

export default MacbooksPage;
