import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modelNames = {
  1: 'AirPods 2',
  2: 'AirPods 3',
  3: 'Pro 2',
  4: 'Max'
};

const AirpodsPage = () => {
  const [airpods, setAirpods] = useState([]);
  const [filteredModel, setFilteredModel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/airpods');
        setAirpods(res.data);
      } catch (err) {
        console.error('Error fetching airpods:', err);
      }
    };
    fetchData();
  }, []);

  const filteredList = filteredModel
    ? airpods.filter((item) => item.model_code === filteredModel)
    : airpods;

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
          {filteredList.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '20px',
                padding: '30px 20px',
                backgroundColor: '#fff',
                textAlign: 'center'
              }}
            >
              <img
                src={`http://localhost:3000${item.images[0]}`}
                alt={item.title}
                style={{
                  height: '200px',
                  objectFit: 'contain',
                  marginBottom: '15px'
                }}
              />

              <h3 style={{ fontWeight: '600', marginBottom: '5px', color: '#000' }}>{item.title}</h3>

              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  border: '1px solid #ccc',
                  margin: '8px auto'
                }}
              ></div>

              <p style={{ fontSize: '14px', color: '#000', margin: '5px 0' }}>
                {item.generation} | {item.chip}
              </p>

              <p style={{ fontSize: '16px', fontWeight: '500', margin: '5px 0 20px', color: '#000' }}>
                {parseFloat(item.price).toFixed(2)}₴
              </p>

              <button
                onClick={() => navigate(`/airpods/${item.id}`)}
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

export default AirpodsPage;
