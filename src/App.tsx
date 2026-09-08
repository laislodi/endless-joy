import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { About } from './pages/About';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { WhyUs } from './pages/WhyUs';
import type { Cart } from './types';

export default function App() {
  const [cart, setCart] = useState<Cart>({});
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="app">
      <Header count={count} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}
