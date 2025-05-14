import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './components/CartContext';

import Home from './pages/Home';
import IphonesPage from './pages/IphonesPage';
import IphoneDetailsPage from './pages/IphoneDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SummaryPage from './pages/SummaryPage';
import SuccessPage from './pages/SuccessPage';
import MacbooksPage from './pages/MacbooksPage';
import MacbookDetailsPage from './pages/MacbookDetailsPage';
import IpadsPage from './pages/IpadsPage';
import IpadDetailsPage from './pages/IpadDetailsPage';
import WatchesPage from './pages/WatchesPage';
import WatchDetailsPage from './pages/WatchDetailsPage';
import AirpodsPage from './pages/AirpodsPage';
import AirpodsDetailsPage from './pages/AirpodsDetailsPage';




function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iphones" element={<IphonesPage />} />
          <Route path="/iphones/:id" element={<IphoneDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/macbooks" element={<MacbooksPage />} />
          <Route path="/macbooks/:id" element={<MacbookDetailsPage />} />
          <Route path="/ipads" element={<IpadsPage />} />
          <Route path="/ipads/:id" element={<IpadDetailsPage />} />
          <Route path="/watches" element={<WatchesPage />} />
          <Route path="/watches/:id" element={<WatchDetailsPage />} />
          <Route path="/airpods" element={<AirpodsPage />} />
          <Route path="/airpods/:id" element={<AirpodsDetailsPage />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
