import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modelNames = {
  1: 'iPad Air',
  2: 'iPad Pro',
  3: 'iPad 10.2"',
  4: 'iPad mini',
};

const IpadsPage = () => {
  const [ipads, setIpads] = useState([]);
  const [filteredModel, setFilteredModel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/ipads');
        setIpads(res.data);
      } catch (err) {
        console.error('Error fetching ipads:', err);
      }
    };
    fetchData();
  }, []);

  const filteredIpads = filteredModel
    ? ipads.filter((ipad) => ipad.model_code === filteredModel)
    : ipads;

  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f7', minHeight: '100vh', marginTop: '40px' }}>
      {/* Фільтри */}
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
              minWidth: '80px'
            }}
          >
            <p style={{ fontSize: '14px', color: '#000', opacity: filteredModel === Number(code) ? 1 : 0.4 }}>
              {name}
            </p>
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
          <p style={{ fontSize: '14px', color: '#000', opacity: filteredModel === null ? 1 : 0.4 }}>Всі</p>
        </div>
      </div>

      {/* Товари */}
      {filteredIpads.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Немає товарів</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '30px'
          }}
        >
          {filteredIpads.map((ipad) => (
            <div
              key={ipad.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '20px',
                padding: '30px 20px',
                backgroundColor: '#fff',
                textAlign: 'center'
              }}
            >
              <img
                src={`http://localhost:3000${ipad.images[0]}`}
                alt={ipad.title}
                style={{
                  height: '200px',
                  objectFit: 'contain',
                  marginBottom: '15px'
                }}
              />

              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: ipad.color,
                    borderRadius: '50%',
                    border: '1px solid #ccc'
                  }}
                ></div>
              </div>

              <h3 style={{ fontWeight: '600', marginBottom: '5px', color: '#000' }}>{ipad.title}</h3>
              <p style={{ fontSize: '14px', color: '#000', margin: '5px 0' }}>{ipad.ram}</p>
              <p style={{ fontSize: '14px', color: '#000', margin: '5px 0' }}>{ipad.chip}</p>
              <p style={{ fontSize: '16px', fontWeight: '500', margin: '5px 0 20px', color: '#000' }}>
                {parseFloat(ipad.price).toFixed(2)}₴
              </p>

              <button
                onClick={() => navigate(`/ipads/${ipad.id}`)}
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

export default IpadsPage;
