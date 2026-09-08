import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import cookiePhoto from '../assets/orange-cookies.png';
import { flavors } from '../data/flavors';
import type { Cart } from '../types';

type ShopProps = {
  cart: Cart;
  setCart: (cart: Cart) => void;
};

export function Shop({ cart, setCart }: ShopProps) {
  const navigate = useNavigate();
  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = useMemo(
    () => flavors.reduce((s, f) => s + (cart[f.id] || 0) * f.price, 0),
    [cart]
  );
  const change = (id: string, delta: number) =>
    setCart({ ...cart, [id]: Math.max(0, (cart[id] || 0) + delta) });

  return (
    <main className="page">
      <div className="page-heading">
        <span className="eyebrow">Build your box</span>
        <h1>Pick your cookies by picture.</h1>
        <p>Tap + or − to choose how many of each flavor you want. Mix and match freely.</p>
      </div>
      <div className="shop-layout">
        <div className="product-grid">
          {flavors.map((f, i) => (
            <article className="product-card" key={f.id}>
              <div className="product-photo">
                {i === 0 ? (
                  <img src={cookiePhoto} alt={f.name} />
                ) : (
                  <div
                    className="cookie-visual"
                    style={{ background: `radial-gradient(circle at 42% 38%, #fff1cf 0 12%, ${f.accent} 13% 68%, #A95B2A 69% 100%)` }}
                  >
                    <i /><i /><i /><i /><i />
                  </div>
                )}
              </div>
              <div className="product-body">
                <div>
                  <h3>{f.name}</h3>
                  <p>{f.note}</p>
                </div>
                <div className="product-bottom">
                  <b>${f.price.toFixed(2)}</b>
                  <div className="stepper">
                    <button onClick={() => change(f.id, -1)} aria-label={`Remove one ${f.name}`}>−</button>
                    <span>{cart[f.id] || 0}</span>
                    <button onClick={() => change(f.id, 1)} aria-label={`Add one ${f.name}`}>+</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="order-summary">
          <span className="eyebrow">Your box</span>
          <h2>{totalQty ? `${totalQty} cookie${totalQty > 1 ? 's' : ''}` : 'Start selecting'}</h2>
          {flavors.filter((f) => cart[f.id]).map((f) => (
            <div className="summary-line" key={f.id}>
              <span>{cart[f.id]} × {f.name}</span>
              <b>${((cart[f.id] || 0) * f.price).toFixed(2)}</b>
            </div>
          ))}
          <hr />
          <div className="summary-total">
            <span>Subtotal</span>
            <b>${subtotal.toFixed(2)}</b>
          </div>
          <button className="btn btn-primary full" disabled={!totalQty} onClick={() => navigate('/checkout')}>
            Continue to checkout
          </button>
          <small>Payment and delivery are simulated for this front-end prototype.</small>
        </aside>
      </div>
    </main>
  );
}
