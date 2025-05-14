import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition w-full max-w-xs mx-auto">
      <Link to={`/iphones/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-36 h-36 object-contain mx-auto mb-3"
        />
      </Link>

      <div
        className="w-4 h-4 mx-auto mb-2 rounded-full border"
        style={{ backgroundColor: product.color }}
      ></div>

      <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.storage}</p>
      <p className="text-sm text-gray-600 mb-1">SIM: {product.sim_type}</p>
      <p className="font-bold text-lg mb-3">{parseFloat(product.price).toLocaleString()}₴</p>

      <Link to={`/iphones/${product.id}`}>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm transition"
        >
          Купити
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
