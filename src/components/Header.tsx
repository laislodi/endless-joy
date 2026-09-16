import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import monogram from '../assets/logo-monogram.png';

type HeaderProps = {
  count: number;
};

export function Header({ count }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <img src={monogram} alt="Endless & Joy monogram" />
        <span>Endless & Joy</span>
      </Link>
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>
      <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/why-us">Why Us</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink className="cart-pill" to="/shop">
          Bag <b>{count}</b>
        </NavLink>
      </nav>
    </header>
  );
}
