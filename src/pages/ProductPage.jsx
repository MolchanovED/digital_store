import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const IphoneDetailsPage = () => {
  const { id } = useParams();
  const [iphone, setIphone] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchIphone = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/iphones/${id}`);
        setIphone(res.data);
        setSelectedImage(res.data.images[0]);
      } catch (err) {
        console.error('Помилка при завантаженні:', err);
      }
    };
    fetchIphone();
  }, [id]);

  if (!iphone) return <div className="text-center p-10 text-lg">Завантаження...</div>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-10 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Лівий блок зображень */}
      <div className="flex flex-col items-center">
        <img
          src={selectedImage}
          alt={iphone.title}
          className="w-72 h-72 object-contain mb-4 border-2 border-blue-500 rounded-md"
        />
        <div className="flex gap-2">
          {iphone.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`img-${index}`}
              onClick={() => setSelectedImage(img)}
              className={`w-14 h-14 object-cover border rounded-md cursor-pointer ${
                selectedImage === img ? 'ring-2 ring-blue-600' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Правий блок інформації */}
      <div className="max-w-sm w-full text-left">
        <h1 className="text-3xl font-bold mb-4">{iphone.title}</h1>

        <div className="mb-2">
          <span className="block font-semibold text-sm mb-1">Памʼять:</span>
          <div className="px-3 py-1 border rounded inline-block text-sm">{iphone.storage}</div>
        </div>

        <div className="mb-2">
          <span className="block font-semibold text-sm mb-1">Колір:</span>
          <div
            className="w-5 h-5 rounded-full border"
            style={{ backgroundColor: iphone.color }}
          ></div>
        </div>

        <div className="mb-4">
          <span className="block font-semibold text-sm mb-1">SIM:</span>
          <div className="px-3 py-1 border rounded inline-block text-sm">{iphone.sim_type}</div>
        </div>

        <p className="text-2xl font-bold mb-6">
          {parseFloat(iphone.price).toLocaleString()} грн
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm transition">
          Додати у кошик
        </button>
      </div>
    </div>
  );
};

export default IphoneDetailsPage;
