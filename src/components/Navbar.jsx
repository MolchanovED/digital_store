import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import appleIcon from '../assets/icons/apple.png';
import cartIcon from '../assets/icons/cart.png';

const menuItems = ['Mac', 'iPad', 'iPhone', 'Watch', 'AirPods'];

const dropdownContent = {
  Mac: {
    left: [
      'Переглянути всі моделі Mac',
      'MacBook Air',
      'MacBook Pro',
      'iMac',
      'Mac mini',
      'Mac Studio',
      'Mac Pro',
    ],
    right: ['Підтримка Mac'],
  },
  iPad: {
    left: [
      'Переглянути всі моделі iPad',
      'iPad Pro',
      'iPad Air',
      'iPad',
      'iPad mini',
      'Apple Pencil',
      'Клавіатури',
    ],
    right: ['Підтримка iPad'],
  },
  iPhone: {
    left: [
      'Переглянути всі моделі iPhone',
      'iPhone 16 Pro',
      'iPhone 16',
      'iPhone 16e',
      'iPhone 15',
    ],
    right: ['Підтримка iPhone', 'Конфіденційність iPhone'],
  },
  Watch: {
    left: [
      'Переглянути всі моделі Apple Watch',
      'Apple Watch Series 10',
      'Apple Watch Ultra 2',
      'Apple Watch SE',
      'Apple Watch Nike',
    ],
    right: ['Підтримка Apple Watch'],
  },
  AirPods: {
    left: [
      'Переглянути всі моделі AirPods',
      'AirPods 4',
      'AirPods Pro 2',
      'AirPods Max',
    ],
    right: ['Підтримка AirPods', 'Apple Music'],
  },
};

export default function Navbar({ onCartClick }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

const handleNavClick = (item) => {
  switch (item) {
    case 'iPhone':
      navigate('/iphones');
      break;
    case 'iPad':
      navigate('/ipads');
      break;
    case 'Mac':
      navigate('/macbooks');
      break;
    case 'Watch':
      navigate('/watches');
      break;
    case 'AirPods':
      navigate('/airpods');
      break;
    default:
      break;
  }
};

  return (
    <div className="navbar-wrapper" onMouseLeave={() => setActiveDropdown(null)}>
      <div className="navbar">
        <Link to="/">
          <img src={appleIcon} alt="Apple" className="nav-icon" />
        </Link>

        {menuItems.map((item) => (
          <div
            key={item}
            className={`nav-item ${activeDropdown === item ? 'active' : ''}`}
            onMouseEnter={() => setActiveDropdown(item)}
            onClick={() => handleNavClick(item)}
          >
            {item}
          </div>
        ))}

        <img
          src={cartIcon}
          alt="Cart"
          className="nav-icon"
          onClick={onCartClick}
        />
      </div>

      {activeDropdown && (
        <div
          className="dropdown"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
        >
          <div className="dropdown-left">
            <div className="dropdown-sub">Дізнатися про {activeDropdown}</div>
            <h2>{dropdownContent[activeDropdown].left[0]}</h2>
            <ul>
              {dropdownContent[activeDropdown].left.slice(1).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="dropdown-right">
            <div className="dropdown-sub">Більше від {activeDropdown}</div>
            <ul>
              {dropdownContent[activeDropdown].right.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
