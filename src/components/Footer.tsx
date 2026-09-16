import { Link } from 'react-router-dom';
import monogram from '../assets/logo-monogram.png';

export function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <img src={monogram} alt="Endless & Joy" />
        <div>
          <b>Endless & Joy</b>
          <span>Artisan cookies • Southeast Calgary</span>
        </div>
      </div>
      <div className="footer-links">
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <p>Life’s too short for boring cookies.</p>
    </footer>
  );
}
